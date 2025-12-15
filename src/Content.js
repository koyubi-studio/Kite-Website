import React, { forwardRef, useState, useEffect } from "react";

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

  useEffect(() => {
    fetch("/content.json")
      .then((res) => res.json())
      .then((jsonData) => setData(jsonData))
      .catch((err) => console.error("Failed to load content:", err));
  }, []);

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
            {/* Optional extra top image (like Helium Burning) */}
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
                {/* Description inside caption block if needed */}
                {project.description && !project.gallery && !project.gallery_vertical && (
                   // If it's a simple layout, description might go here or below. 
                   // Based on your original code, description is usually below the block.
                   null
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

              {/* Gallery Grid inside Caption Wrapper (like O3 or Ibbur) */}
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

            {/* Secondary Image (like Helium Burning Pola Print) */}
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
            
            {/* Vertical Gallery (like Sun's Surface) */}
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

        {/* --- FORM IMPLEMENTATION --- */}
        <div className="contact-block">
          <p className="contact-heading">Request &amp; Purchase</p>

          <form
            action={data.contact.form_action}
            method="POST"
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
