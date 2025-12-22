import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

// Helper component to render text with newlines/HTML safely
const HTMLText = ({ content, className = "" }) => {
  if (!content) return null;
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

const Content = forwardRef(({ isMobile, sectionRefs }, ref) => {
  const [data, setData] = useState(null);
  
  // NEW: State to track form submission status (success, error, or empty)
  const [formStatus, setFormStatus] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [showTurnstile, setShowTurnstile] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const turnstileContainerRef = useRef(null);
  const turnstileWidgetIdRef = useRef(null);
  const pendingFormDataRef = useRef(null);
  const pendingFormRef = useRef(null);

  useEffect(() => {
    fetch("/content.json")
      .then((res) => res.json())
      .then((jsonData) => setData(jsonData))
      .catch((err) => console.error("Failed to load content:", err));
  }, []);

  useEffect(() => {
    if (window.turnstile) {
      setTurnstileReady(true);
      return undefined;
    }

    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => setTurnstileReady(true);
    script.onerror = () => setFormStatus("ERROR");
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const submitFormData = useCallback(
    (formData, formElement, tokenOverride) => {
      if (!data?.contact?.form_action) {
        setFormStatus("ERROR");
        return;
      }

      if (!process.env.REACT_APP_TURNSTILE_SITE_KEY) {
        setFormStatus("TURNSTILE_CONFIG_ERROR");
        return;
      }

      const tokenToUse = tokenOverride || turnstileToken;

      if (!tokenToUse) {
        pendingFormDataRef.current = formData;
        pendingFormRef.current = formElement;
        setShowTurnstile(true);
        setFormStatus("AWAITING_CAPTCHA");

        if (
          turnstileReady &&
          window.turnstile &&
          turnstileWidgetIdRef.current
        ) {
          window.turnstile.reset(turnstileWidgetIdRef.current);
        }
        return;
      }

      formData.set("cf-turnstile-response", tokenToUse);
      setFormStatus("SUBMITTING");

      fetch(data.contact.form_action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json", // Tells Formspree to return JSON, not a page redirect
        },
      })
        .then((response) => {
          if (response.ok) {
            setFormStatus("SUCCESS");
            formElement?.reset();
            setTurnstileToken("");
            setShowTurnstile(false);
            if (window.turnstile && turnstileWidgetIdRef.current) {
              window.turnstile.reset(turnstileWidgetIdRef.current);
            }
          } else {
            response.json().then((body) => {
              if (Object.hasOwn(body, "errors")) {
                setFormStatus(
                  body["errors"].map((error) => error["message"]).join(", ")
                );
              } else {
                setFormStatus("ERROR");
              }
            });
          }
        })
        .catch(() => {
          setFormStatus("ERROR");
        });
    },
    [data?.contact?.form_action, turnstileReady, turnstileToken]
  );

  useEffect(() => {
    if (
      !turnstileReady ||
      !showTurnstile ||
      !turnstileContainerRef.current ||
      turnstileWidgetIdRef.current ||
      !process.env.REACT_APP_TURNSTILE_SITE_KEY
    ) {
      return;
    }

    if (!window.turnstile) return;

    turnstileWidgetIdRef.current = window.turnstile.render(
      turnstileContainerRef.current,
      {
        sitekey: process.env.REACT_APP_TURNSTILE_SITE_KEY,
        callback: (token) => {
          setTurnstileToken(token);
          if (pendingFormDataRef.current) {
            submitFormData(
              pendingFormDataRef.current,
              pendingFormRef.current,
              token
            );
            pendingFormDataRef.current = null;
            pendingFormRef.current = null;
          }
        },
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setFormStatus("ERROR"),
      }
    );
  }, [showTurnstile, submitFormData, turnstileReady]);

  // NEW: Function to handle form submission without redirecting
  const handleSubmit = (event) => {
    event.preventDefault(); // Stop browser from redirecting
    const form = event.target;
    const formData = new FormData(form);

    submitFormData(formData, form);
  };

  if (!data) return <div style={{ padding: "50px" }}>Loading content...</div>;

  return (
    <div ref={ref}>
      {/* --- ABOUT SECTION --- */}
      <p
        id="ABOUT"
        ref={(el) => (sectionRefs.current["ABOUT"] = el)}
        className="content-section"
      >
        <img
          src={data.about.main_image}
          alt="About Main"
          style={{
            width: isMobile ? "100%" : "50%",
            height: "auto",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <br />
        <br />
        <br />
        <HTMLText content={data.about.text_1} />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <img
          src={data.about.notation_image}
          alt="Notation Art"
          className="large-image"
        />
        <br />
        <br />
        <HTMLText content={data.about.text_2} />
        <br />
        <br />
        <br />
      </p>

      {/* --- SCENT SECTION --- */}
      <p
        id="SCENT"
        ref={(el) => (sectionRefs.current["SCENT"] = el)}
        className="content-section"
      >
        <img
          src={data.scent.main_image}
          alt="Scent Main"
          className="large-image"
        />
        <br />
        <br />
        {data.scent.title} <br />
        <br />
        <HTMLText content={data.scent.description} />
        <br />
        <span className="special-font">{data.scent.details}</span>
      </p>
      <br />
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {data.scent.comparison_images && (
          <>
            <img
              src={data.scent.comparison_images[0]}
              alt="Weather Scan"
              style={{ width: "52%", height: "auto", display: "block" }}
            />
            <img
              src={data.scent.comparison_images[1]}
              alt="Bottle X-Ray"
              style={{ width: "44%", height: "auto", display: "block" }}
            />
          </>
        )}
      </div>

      {/* --- PROCESS SECTION --- */}
      <p
        id="PROCESS"
        ref={(el) => (sectionRefs.current["PROCESS"] = el)}
        className="content-section"
      >
        <HTMLText content={data.process.text_1} />
        <br />
        <br />
        <HTMLText content={data.process.text_2} />
        <br />
        <br />
        <HTMLText content={data.process.text_3} />
      </p>
      <br />
      <br />
      {data.process.gallery_images.map((imgSrc, index) => (
        <React.Fragment key={index}>
          <img
            src={imgSrc}
            alt={`Process ${index}`}
            className="responsive-image"
          />
          <br />
        </React.Fragment>
      ))}

      {/* --- STUDIO SECTION (PROJECTS) --- */}
      <div
        id="STUDIO"
        ref={(el) => (sectionRefs.current["STUDIO"] = el)}
        className="content-section"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          {data.studio.header_images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Pola Scan"
              style={{ width: "31%", height: "auto", display: "block" }}
            />
          ))}
        </div>
        <br />
        <br />
        <p><HTMLText content={data.studio.intro_text} /></p>
        <br />
        <br />

        {/* Dynamic Project Rendering */}
        {data.studio.projects.map((project, index) => (
          <div key={index} className="project-block">
            {/* Optional extra top image */}
            {project.extra_image && (
              <>
                <img
                  src={project.extra_image}
                  alt={project.title}
                  className="responsive-image"
                />
                <br />
              </>
            )}

            <div className="caption-wrapper">
              <div className="caption-text">
                <strong>{project.title}</strong> <br />
                <br />
                <HTMLText content={project.materials} />
                {project.location && (
                  <>
                    <br /> <br /> {project.location}
                  </>
                )}
              </div>
              
              {/* Single Main Image inside Caption Wrapper */}
              {project.main_image && (
                <img
                  src={project.main_image}
                  alt={project.title}
                  className="caption-image"
                />
              )}

              {/* Gallery Grid inside Caption Wrapper */}
              {project.gallery && (
                <div
                  className="caption-image"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  {project.gallery.map((gImg, gIndex) => (
                    <img
                      key={gIndex}
                      src={gImg}
                      alt={`${project.title} ${gIndex}`}
                      style={{
                        width: "48%",
                        marginBottom: "10px",
                        display: "block",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Secondary Image */}
            {project.secondary_image && (
                <>
                <br/>
                <div className="caption-wrapper">
                    <div className="caption-text">
                        {project.location}
                    </div>
                    <img src={project.secondary_image} className="responsive-image" alt="Secondary" />
                </div>
                </>
            )}

            <br />
            {project.description && (
                <p>
                    <HTMLText content={project.description} />
                </p>
            )}
            
            {/* Vertical Gallery */}
            {project.gallery_vertical && (
                <>
                    <br/>
                    {project.gallery_vertical.map((vImg, vIndex) => (
                        <React.Fragment key={vIndex}>
                            <img src={vImg} className="responsive-image" alt="Detail" />
                            <br/>
                        </React.Fragment>
                    ))}
                </>
            )}

            <br />
            <br />
            <br />
          </div>
        ))}
      </div>

      {/* --- CONTACT SECTION --- */}
      <section
        id="CONTACT"
        ref={(el) => (sectionRefs.current["CONTACT"] = el)}
        className="content-section"
      >
        <div className="bio-wrapper">
          <div className="bio-text">
            <HTMLText content={data.contact.bio_text} />
          </div>
          <img
            src={data.contact.bio_image}
            alt="Bio"
            className="bio-image"
          />
        </div>

        <br />
        <br />

        {/* --- FORM IMPLEMENTATION (UPDATED) --- */}
        <div className="contact-block">
          <p className="contact-heading">Request &amp; Purchase</p>

          <form
            onSubmit={handleSubmit}
            className="contact-form"
          >
            <label>
              Name
              <input type="text" name="name" required />
            </label>

            <label>
              Email
              <input type="email" name="email" required />
            </label>

            <label>
              Message
              <textarea name="message" rows="4" required></textarea>
            </label>

            <button type="submit">Send</button>

            {showTurnstile && (
              <div style={{ marginTop: "1rem" }}>
                <div ref={turnstileContainerRef} />
              </div>
            )}

            {/* Success Message */}
            {formStatus === "SUCCESS" && (
              <p style={{ marginTop: "1rem" }}>
                Thank you!
              </p>
            )}

            {/* Error Message */}
            {formStatus === "ERROR" && (
              <p style={{ marginTop: "1rem", color: "red" }}>
                Oops! There was a problem submitting your form.
              </p>
            )}

            {formStatus === "TURNSTILE_CONFIG_ERROR" && (
              <p style={{ marginTop: "1rem", color: "red" }}>
                Missing Turnstile site key. Please set{" "}
                <code>REACT_APP_TURNSTILE_SITE_KEY</code>.
              </p>
            )}

            {formStatus === "AWAITING_CAPTCHA" && (
              <p style={{ marginTop: "1rem" }}>
                Please complete the Turnstile check to send your message.
              </p>
            )}

            {formStatus === "SUBMITTING" && (
              <p style={{ marginTop: "1rem" }}>Submitting...</p>
            )}
          </form>
        </div>
      </section>

      <br />
      <br />
      <br />
    </div>
  );
});

export default Content;
