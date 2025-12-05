import React, { forwardRef } from "react";

// This component handles the text and images so the main logic file stays clean
const Content = forwardRef(({ isMobile, sectionRefs }, ref) => {
  return (
    <div ref={ref}>
      {/* --- ABOUT SECTION --- */}
      <p
        id="ABOUT"
        ref={(el) => (sectionRefs.current["ABOUT"] = el)}
        className="content-section"
      >
        <img
          src="/Main Image-min.png"
          alt="Kites Bottle Composite"
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
        Kites began as a constellation of tools, using scent as both compass and
        archive, a way of entering atmospheres through fragrance. Among all our
        senses, scent remains one of the last signifiers of reality, cutting
        through mental abstractions to bring us back to presence. The process
        feels like a ritual: you give meaning to a fragrance, place it on your
        skin, and it becomes an embodied memory.
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <img src="/NOTATION-3.jpg" alt="Notation Art" className="large-image" />
        <br />
        <br />
        For me, scent became an anchor - a way to distill the essence of a story
        and re-enter its exact creative terrain. I think of each piece in terms
        of mood and sensory correspondence. Even elusive ideas reveal themselves
        through association. When writing a script set in a dance school, I
        build scents from a memory: dusty floors laced with resin and iris,
        sharp tang of hairspray in a changing room, metallic bite of barre
        railings, charged static of synthetic bodysuits. As the work deepened,
        so did the tools - scents for scenes, for characters, for the shifting
        undercurrents that shaped the artworks. Over time, an intricate library
        took shape: each fragrance preserving a world in suspension. What began
        as a private compass now feels like something to be shared - a map for
        others to wander, explore, and be caught by feeling they can’t quite
        name.
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
          src="/Kites Bottle Scan 3.jpg"
          alt="Kites Bottle Scan"
          className="large-image"
        />
        <br />
        <br />
        STATIC ELECTRICITY <br />
        Static Electricity is a moment caught mid-charge - the air just before
        lightning touches glass. In the split second before lightning strikes,
        the air changes - ions leap, and the sky tastes faintly metallic. Static
        Electricity captures the charged atmosphere: the crisp clarity of
        ionised air, softened by the grounding warmth of musk. Born from the
        same forces that arc through my high-voltage glass sculptures, it
        carries the sensation of energy held in suspension.
        <br />
        <span className="special-font">
          wearable sculpture and unique polaroid, limited edition of 20
        </span>
      </p>
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
        <img
          src="/Weather-Scan-1.jpg"
          alt="Weather Scan"
          style={{ width: "52%", height: "auto", display: "block" }}
        />
        <img
          src="/Bottle-Composite-Dark-X_RAY-LARGE.jpg"
          alt="Bottle Composite X-Ray"
          style={{ width: "44%", height: "auto", display: "block" }}
        />
      </div>

      {/* --- PROCESS SECTION --- */}
      <p
        id="PROCESS"
        ref={(el) => (sectionRefs.current["PROCESS"] = el)}
        className="content-section"
      >
        Each Kites vessel begins as a hand-drawn relief sketch, which is cast in
        molten glass. The pieces are produced in small batches, then carefully
        cooled, hand-engraved, and individually numbered.
        <br />
        <br />
        No two are ever identical — each bottle carries its own subtle
        variations in texture and light, making it a wearable sculpture as much
        as a fragrance vessel. Once filled, every bottle is sealed by hand with
        wax, completing the process.
        <br />
        <br />
        No two are alike - every piece is a wearable sculpture with its own play
        of light. Inside, I compose the fragrance from the finest raw materials,
        blended and bottled in-house.
      </p>
      <br />
      <br />
      <br />
      <img
        src="/Bottle-Scan-XRAY-Dropper.jpg"
        alt="Bottle X-Ray Dropper"
        className="responsive-image"
      />
      <br />
      <img
        src="/raw_unsync.jpg"
        alt="Raw Unsync"
        className="responsive-image"
      />
      <br />
      <img
        src="/Bottle-Composite-Dark-Flash.jpg"
        alt="Bottle Composite Flash"
        className="responsive-image"
      />
      <br />

      {/* --- STUDIO SECTION --- */}
      <p
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
          <img
            src="/Web Pola Scan 3X 3.jpg"
            alt="Pola Scan 3"
            style={{ width: "31%", height: "auto", display: "block" }}
          />
          <img
            src="/Web Pola Scan 3X 2.jpg"
            alt="Pola Scan 2"
            style={{ width: "31%", height: "auto", display: "block" }}
          />
          <img
            src="/Web Pola Scan 3X 1.jpg"
            alt="Pola Scan 1"
            style={{ width: "31%", height: "auto", display: "block" }}
          />
        </div>
        <br />
        <br />
        In each of my installations, scent is a hidden circuitry running through
        the work, binding glass, gas, metal and light into a single, charged
        atmosphere. Each piece holds its own microclimate: ozone sharpening the
        air around a rose, vegetal traces of grass and moss suspended in glass,
        notes that suggest downed power lines or the distant heat of a star.
        <br />
        <br />
        <br />
        <img
          src="/Kites Draft Bottle 1.jpg"
          alt="Draft Bottle"
          className="responsive-image"
        />
        <br />
        <div className="caption-wrapper">
          <div className="caption-text">
            Helium Burning, 2023 <br />
            <br />
            glass, helium, krypton, metal, scent
          </div>
          <img
            src="/Web-Print 15.jpg"
            alt="Helium Burning"
            className="responsive-image"
          />
        </div>
        <br />
        <div className="caption-wrapper">
          <div className="caption-text">
            Museum of Modern Art Warsaw & Pulchri Studio, The Hague
          </div>
          <img
            src="/Pola Print 3.jpg"
            alt="Pola Print"
            className="responsive-image"
          />
        </div>
        <br />
        <br />
        <br />
        “Helium Burning” is a cinematic-sensory story, experienced through scent
        - as the Sun loses its Gravity (fire, smoke, ashes) and the Earth leaves
        its Orbit (soil, rain, atmosphere). Helium burning (glass, krypton,
        helium, metal) is the fusion of helium in the contracted core of a giant
        star at extremely high temperatures. The Sun is a humongous
        thermonuclear bomb in a continuous fusion explosion. Its immense gravity
        contains it as a sphere. Molecular bonds by shared electrons are
        impossible. They are pressed together due to the pressure exerted upon
        them, but unable to join together other than on an atomic level.
        <br />
        <br />
        <br />
        “Grass Render” (scent, lass, krypton, argon) uses sensory narrative to
        explore our entangled relationship with plants. The work suspends
        fragrances of grass, moss, wood and soil in glass vessels filled with
        krypton and argon, tracing the quiet magic of natural elements as they
        move into air.
        <br />
        <br />
        <br />
        <div className="caption-wrapper">
          <div className="caption-text">
            Grass Render, 2023 <br />
            <br /> Glass, krypton, argon, PLA, scent <br />
            <br /> with Clara Schweers <br />
            <br /> Dutch Design Week, Eindhoven & Die Frappant gallery, Hamburg
          </div>
          <img
            src="/Glass Render.jpeg"
            alt="Glass Render"
            className="caption-image"
          />
        </div>
        <br />
        <br />
        <br />
        <div className="caption-wrapper">
          <div className="caption-text">
            Subsurface, 2025
            <br />
            glass, xenon, neon, argon, electrodes <br />
            <br /> with Clara Schweers <br />
            <br />
            Gallery “apiece”, Vilnius & Klaipeda Biennial, KCCC
          </div>
          <img
            src="/Web-Print 13.jpg"
            alt="Subsurface"
            className="caption-image"
          />
        </div>
        <br />
        “Subsurface” (glass, neon, xenon, argon), operates as a living system,
        mirroring embryonic development, geological pressure and electrical
        circulation, and invites reflection on containment and exposure on the
        unseen forces that both nurture and protect.
        <br />
        <br />
        <div className="caption-wrapper">
          <div className="caption-text">
            <br />
            Satellites, 2025 <br />
            <br /> with Jake Scott NOAA 19 <br />
            <br />
            weather satellite data direct downlink at 137.100 MHz
          </div>
          <img
            src="/raw_sync 2.jpg"
            alt="Satellites"
            className="caption-image"
          />
        </div>
        <br />
        Over the summer of 2025, final captures were made from the National
        Aeronautics Association’s three weather satellites NOAA-14, NOAA-15, and
        NOAA-19. Among their onboard instruments were total column ozone mappers
        and high-altitude radiometers, built to observe clouds, aerosols, and
        ice. Having long outlived their original missions and been superseded by
        newer generations, they still drifted faithfully in orbit —
        transmitting, patiently, in case anyone was curious enough to build an
        antenna and listen. We connected directly to the satellite to receive
        these images with a home made antenna and software. Not long after these
        final scans were received, the satellites’ instruments began to fail.
        They were formally decommissioned, their signals fading before their
        eventual annihilation on re-entry.
      </p>
      <br />
      <br />
 <div className="caption-wrapper">
              <div className="caption-text">
                O3, 2021
                <br />
                <br /> Electrical transformer, glass, real rose,
                <br />
                <br /> Ozone scent
                <br />
                <br /> winner of the Jury Special Prize and Public Choice Award
                <br />
                <br /> Contemporary Art Center, CAC - Vilnius
              </div>
              <div
                className="caption-image"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src="/Lightning Rose 1.jpg"
                  alt="Lightning Rose 1"
                  style={{
                    width: "48%",
                    marginBottom: "10px",
                    display: "block",
                  }}
                />
                <img
                  src="/Lightning Rose 2.jpg"
                  alt="Lightning Rose 2"
                  style={{
                    width: "48%",
                    marginBottom: "10px",
                    display: "block",
                  }}
                />
                <img
                  src="/Lightning Rose 3.jpg"
                  alt="Lightning Rose 3"
                  style={{
                    width: "48%",
                    display: "block",
                  }}
                />
                <img
                  src="/Lightning Rose 4.jpg"
                  alt="Lightning Rose 4"
                  style={{
                    width: "48%",
                    display: "block",
                  }}
                />
              </div>
            </div>
            <br />
            <div className="caption-wrapper">
              <div className="caption-text">
                Ibbur, 2025 <br />
                <br /> glass, helium, argon, metal <br />
                <br /> with Yuma Burgess <br />
                <br /> Saatchi Gallery
              </div>
              <div
                className="caption-image"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src="/Ibbur 17.jpg"
                  alt="Ibbur 17"
                  style={{
                    width: "48%",
                    marginBottom: "10px",
                    display: "block",
                  }}
                />
                <img
                  src="/Ibbur 18.jpg"
                  alt="Ibbur 18"
                  style={{
                    width: "48%",
                    marginBottom: "10px",
                    display: "block",
                  }}
                />
                <img
                  src="/Ibbur 21.jpg"
                  alt="Ibbur 21"
                  style={{
                    width: "48%",
                    display: "block",
                  }}
                />
                <img
                  src="/Ibbur 24.jpg"
                  alt="Ibbur 24"
                  style={{
                    width: "48%",
                    display: "block",
                  }}
                />
              </div>
            </div>
            <br />
            “Ibbur”, draws from Kabbalistic tradition, where ibbur -
            “impregnation” - names a benevolent possession in which an
            ancestor’s soul temporarily inhabits the living to offer guidance,
            suggesting that identity is shaped not only by personal experience
            but by the spirits and intelligences we invite in. As we open
            ourselves to external forces, both spiritual and artificial, it
            gently wonders whether we remain agents of our own becoming or are
            slowly becoming vessels for futures that script our consciousness.
            <br />
            <br />
            <div className="caption-wrapper">
              <div className="caption-text">
                Scented Trip, book & absolute 2019-2022 <br />
                <br /> book and brugmansia absolute, 3ml
              </div>
              <div
                className="caption-image"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src="/web-scented_trip 2.jpg"
                  alt="Scented Trip 2"
                  style={{
                    width: "48%",
                    marginBottom: "10px",
                    display: "block",
                  }}
                />
                <img
                  src="/web-scented_trip 1.jpg"
                  alt="Scented Trip 1"
                  style={{
                    width: "48%",
                    marginBottom: "10px",
                    display: "block",
                  }}
                />
                <img
                  src="/Scented Trip.jpg"
                  alt="Scented Trip Main"
                  style={{
                    width: "48%",
                    display: "block",
                  }}
                />
                <img
                  src="/Brugmancia RE.jpg"
                  alt="Brugmancia"
                  style={{
                    width: "48%",
                    display: "block",
                  }}
                />
              </div>
            </div>
            <br />
            This book and accompanying scent broach the topics of perception of
            authenticity and collective hallucinations. Comprising photographic
            material and documentation taken during travels to Kilimanjaro and
            the Himalayas, Scented Trip explores phenomena of loss of self, for
            example during carnivals, folkloric events, and rituals involving
            mask-wearing and meditative “chams” and similar dances.
            web-scented_trip 2.jpg web-scented_trip 1.jpg Scented Trip.jpg
            Brugmancia RE.jpg In one defining moment of the work, whilst
            traveling at the foothills of Kilimanjaro, I met a local man who
            invited her to smell a giant, hypnotic white flower. This inhalation
            led to intense hallucinations involving ants, as she stood in the
            middle of the rainforest. The flower in question, officially named
            Brugmansia, is used locally for its hallucinogenic, and seemingly
            unpleasant, effect. However it must be noted that, while sinister at
            first glance, the hallucinations are reported to be controllable by
            the user—with time and practice, frightening insects from “the
            underworld” can even be revisited and tamed by those who conjure
            them. Alongside visual documentation, Scented Trip exists as a
            scent: a 3 ml droplet is extracted using the enfleurage method,
            making Brugmansia absolute the main note in the perfume. This work
            therefore also comprises a wearable but hypnotic, poisonous, and
            literally narcotic, perfume.
            <br />
            <br />
            <div className="caption-wrapper">
              <div className="caption-text">
                Sun’s surface, 2023 <br />
                <br /> 3D video, LCD screen, convex glass lens, stainless steel{" "}
                <br />
                <br /> with Jurgis Lietunovas <br />
                <br /> Milan Design Week & Observatory of Ideas, Vilnius
              </div>
              <img
                src="/SunsSurface-min.jpeg"
                alt="Sun's Surface"
                className="caption-image"
              />
            </div>
            <img
              src="/Web-Pola-Scan-22.jpg"
              alt="Sun's Surface"
              className="caption-image"
            />
            <br />
            <img
              src="/Web-Pola-Scan-23.jpg"
              alt="Image-6"
              className="responsive-image"
            />
            <br />
            <img
              src="/Web-Print 4.jpg"
              alt="Image-6"
              className="responsive-image"
            />
            <br />
            <img
              src="/Web-Print 12.jpg"
              alt="Image-6"
              className="responsive-image"
            />
            <br />
            <img
              src="/web-conductive 1.jpg"
              alt="Image-6"
              className="responsive-image"
            />
            <br />
            <img
              src="/Lightning Rose RE.jpg"
              alt="Image-6"
              className="responsive-image"
            />
            <br />
            <img
              src="/Helium Burning CU RE.jpg"
              alt="Image-6"
              className="responsive-image"
            />
            <br />
            <br />

      {/* --- CONTACT SECTION --- */}
      <p id="CONTACT" ref={(el) => (sectionRefs.current["CONTACT"] = el)}></p>
      <br />
      <br />
      <div className="bio-wrapper">
        <div className="bio-text">
          Emilija Povilanskaite is a visual artist and film director. Her work -
          rooted in storytelling - is multifaceted, connecting technology,
          science, research and olfactory design, exploring how digital worlds
          reshape human perception through sensory experiences. Her work
          channels ancient folklore and myth-making into contemporary
          technological spaces. By architecting fictional worlds that engage
          multiple senses, she develops innovative interfaces between
          technology, imagination, and embodied human experience.
        </div>
        <img src="/Ibbur 31.jpg" alt="Emilija Portrait" className="bio-image" />
      </div>
      <br />
      <br />

      {/* --- FORM IMPLEMENTATION --- */}
      <div className="contact-form">
        <h3 style={{ marginBottom: "20px", fontWeight: 500 }}>
          Request & Purchase
        </h3>

        <label>Name</label>
        <input type="text" className="contact-input" placeholder="Your Name" />

        <label>Email</label>
        <input
          type="email"
          className="contact-input"
          placeholder="Your Email"
        />

        <label>Message</label>
        <textarea
          className="contact-textarea"
          rows={4}
          placeholder="Your inquiry..."
        ></textarea>

        <button className="contact-button">Submit</button>
      </div>

      <br />
      <br />
      <br />
    </div>
  );
});

export default Content;
