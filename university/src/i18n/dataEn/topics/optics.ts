import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'geometric-optics': {
    chapter: 'Chapter 1 Geometric Optics',
    title: "Fermat's Principle and Paraxial Imaging",
    summary:
      'Geometric optics treats light as rays travelling along straight lines; Fermat\'s principle yields the laws of reflection and refraction in one stroke, and from them the paraxial imaging system of spherical surfaces and thin lenses is built.',
    keyPoints: [
      'Fermat\'s principle: light travels from one point to another along the path on which the optical path is stationary—the master statement of geometric optics',
      'The law of reflection $\\theta_i=\\theta_r$ and the law of refraction $n_1\\sin\\theta_1=n_2\\sin\\theta_2$ both follow from extremizing the optical path',
      'Paraxial imaging by a single spherical surface: $\\frac{n_1}{s}+\\frac{n_2}{s^{\\prime}}=\\frac{n_2-n_1}{R}$',
      'Thin-lens equation $\\frac{1}{s}+\\frac{1}{s^{\\prime}}=\\frac{1}{f}$ and lateral magnification $m=-s^{\\prime}/s$',
      'The lensmaker\'s equation ties the focal length to the glass index and the two surface curvatures',
      'The critical angle for total internal reflection $\\theta_c=\\arcsin(n_2/n_1)$ underlies optical fibres and prisms',
    ],
    relatedProblemIds: ['optics-p1'],
    content: String.raw`

From childhood we are told that "light travels in straight lines". The beam of a flashlight, the shadow cast through a window—everything seems to confirm it. Yet a chopstick thrust obliquely into a glass of water appears to bend at the surface; a mirror can "bounce" light back along its original path; a magnifying glass enlarges print; a periscope lets light turn two right angles and still form an image. Why does the same light sometimes go straight, sometimes turn, sometimes get reflected back, sometimes get magnified? To answer this, geometric optics offers a minimal yet extremely powerful language: picture light as particles advancing along "rays", which change direction by fixed rules at an interface and otherwise travel straight ahead.

The beauty of this language is that it never needs to ask "what is light" (a wave or a particle); given just two basic rules—light goes straight in a uniform medium, and changes direction at an interface according to the laws of reflection and refraction—it can predict almost every imaging phenomenon in lenses, prisms, eyes and telescopes. Fitting a pair of myopia glasses, taking a photograph with a camera, looking at a cell through a microscope: underneath, these few rules are at work. More profoundly, the two rules are not independent empirical laws; they can be derived from a single higher principle—Fermat's principle. In other words, geometric optics is an iceberg: reflection and refraction are only the tip above the water, while what supports the whole system is the simple creed that "the optical path is extremal". Once you have it, you no longer need to memorize angle relations by rote; you can write them directly from the idea of the "least (or most stable) path".

## II. Fermat's Principle: The Optical Path Is Extremal

**Optical path length** is defined in order to convert geometric distances traversed in different media into an equivalent length in vacuum: if light travels a geometric distance $ds$ in a medium of refractive index $n$, its optical path element is $n\,ds$. The total optical path is the integral along the path

$$L = \int_A^B n\,ds$$

**Fermat's principle** states: the path actually taken by light from $A$ to $B$ makes the optical path stationary (a minimum, a maximum, or an inflection point), that is,

$$\delta \int_A^B n\,ds = 0$$

Here the variation $\delta$ denotes a small perturbation of the path. Note that it says "stationary", not necessarily "minimal"—in most everyday cases it is a minimum (which is the origin of the saying that "light takes the least path"), but situations such as reflection off the inner wall of an ellipsoid, or certain gravitational lenses, give maxima or saddle points. Historically, Heron of Alexandria in ancient Greece already guessed that "reflected light takes the shortest path"; Fermat extended it to refraction in 1657, becoming the father of variational principles in optics—earlier even than Newton's principle of least action in mechanics.

Why can an "extremum" govern a ray? From the wave point of view, the neighbouring paths along the actual optical path have almost the same phase (stationary phase); their coherent superposition gives maximum amplitude, so the energy concentrates on this path, which macroscopically appears as a ray. Fermat's principle is therefore both a summary of geometric optics and a hidden bridge to wave optics: as the wavelength tends to zero, the natural ray solution of the wave equation is exactly the path given by Fermat's principle. This thread returns in Chapter 7, when we discuss lasers and resonators.

## III. Deriving the Laws of Reflection and Refraction

Fermat's principle derives the two basic laws elegantly. Consider reflection from $A$ to $B$ at a point $P$ on a plane interface: minimizing the optical path $AP+PB$ with respect to the position of $P$ immediately gives the angle of incidence equal to the angle of reflection,

$$\theta_i = \theta_r$$

The refractive case is slightly more involved. Let medium $1$ have index $n_1$ and medium $2$ index $n_2$, with $A$ in medium $1$ and $B$ in medium $2$. The optical path is $n_1 AP + n_2 PB$; requiring it to be stationary, together with the geometric projection relations on the interface, gives

$$n_1\sin\theta_1 = n_2\sin\theta_2$$

This is Snell's law of refraction (discovered by Snell in 1621, formulated later by Descartes). It reveals a key fact: the reason light "bends toward the normal" in an optically denser medium is that light is slower there ($v=c/n$), and Fermat's principle makes light travel a little less distance in the slow medium to balance the total time. The law of refraction is not only the cornerstone of lens design but also the root of total internal reflection, fibre guiding, mirages, and even diamond cutting (which makes light undergo total internal reflection inside so the stone sparkles more).

When $n_1>n_2$ and the angle of incidence exceeds the critical angle $\theta_c=\arcsin(n_2/n_1)$, the angle of refraction has no real solution and all the light is reflected back into the original medium: this is **total internal reflection**. Optical fibres exploit exactly this, with a core index slightly higher than that of the cladding, so that light undergoes repeated total internal reflection at the interface and propagates forward with very small loss.

## IV. Paraxial Imaging by a Spherical Surface: From the Law of Refraction to the Imaging Formula

Real optical elements are almost all spherical. Consider a point object $O$ in an object-space medium of index $n_1$, whose light is refracted at a spherical surface of radius of curvature $R$ into an image-space medium of index $n_2$; the distances from the vertex to the object and the image are $s$ and $s^{\prime}$. For paraxial rays (small angles with the axis, $\sin\theta\approx\theta$, $\tan\theta\approx\theta$), applying the law of refraction ray by ray and keeping first-order terms gives the single-surface imaging formula

$$\frac{n_1}{s} + \frac{n_2}{s^{\prime}} = \frac{n_2 - n_1}{R}$$

The sign convention is crucial: usually the direction of propagation is taken as positive, $s>0$ means a real object on the incident side, $s^{\prime}>0$ means a real image on the outgoing side, and the radius $R$ is positive when the surface bulges toward the incident light. This formula states in one line "which object point the surface images where", and is the common starting point for understanding lenses, eyes and microscope objectives. Its power lies in its universality: the front surface of a convex lens, a concave lens, or the cornea can all be treated as a single spherical surface and then combined.

A reminder: this formula holds only in the paraxial (small-angle) approximation. Rays too far from the axis do not converge to the same point, producing **spherical aberration**; this is exactly why high-grade lenses use several elements of different curvatures and materials for correction. The simplicity of geometric optics comes at a price—it ignores diffraction and aberrations caused by wavelength, which later chapters must supply.

## V. Thin Lenses and Magnification

Putting the two spherical surfaces together and neglecting the lens thickness relative to the focal length gives a thin lens. Applying the single-surface formula successively to both surfaces, and letting the lens index be $n$ with air on both sides ($n_1=n_2=1$), yields the famous thin-lens equation

$$\frac{1}{s} + \frac{1}{s^{\prime}} = \frac{1}{f},\qquad \frac{1}{f} = (n-1)\left(\frac{1}{R_1} - \frac{1}{R_2}\right)$$

The second relation is called the **lensmaker's equation**; it tells us that the focal length is determined solely by the glass index and the curvatures of the two surfaces, independent of the object and image positions. A convex lens ($R_1>0,R_2<0$ for a converging lens) has positive focal length, a concave lens negative.

The size of the image relative to the object is described by the lateral magnification

$$m = \frac{y^{\prime}}{y} = -\frac{s^{\prime}}{s}$$

A minus sign means a real image is inverted, a plus sign corresponds to an erect virtual image (as with a magnifying glass). When $|m|>1$ the image is enlarged, when $|m|<1$ reduced. With the object inside the focal point ($s<f$), $s^{\prime}<0$ gives an erect, magnified virtual image—this is the principle of the magnifier, and of the concave lens worn by a myopic eye (the virtual image moves back so the eye can receive it); with the object beyond twice the focal length, the image is inverted, reduced and real, exactly as in a camera and on the retina of the human eye.

## VI. Typical Calculations and Instruments

**Example 1: imaging by a magnifier.** A convex lens with $f=10\ \text{cm}$, object distance $s=15\ \text{cm}$. From $1/s^{\prime}=1/10-1/15=1/30$ we get $s^{\prime}=30\ \text{cm}>0$ (a real image), $m=-30/15=-2$, an inverted, magnified real image. If instead $s=8\ \text{cm}<f$, then $1/s^{\prime}=1/10-1/8=-1/40$, $s^{\prime}=-40\ \text{cm}$, an erect, magnified virtual image, suitable for a magnifier.

**Example 2: looking at an object in water.** An eye in air looks at an object at depth $h$ in water; since $n_{\text{water}}>n_{\text{air}}$, the image appears shallower, with apparent depth about $h^{\prime}=h/n_{\text{water}}$—exactly why a swimming pool looks shallower than it is.

**Example 3: critical angle and optical fibre.** From air to glass with $n=1.5$, the critical angle is $\theta_c=\arcsin(1/1.5)\approx41.8^{\circ}$; beyond it total internal reflection occurs and light is "trapped" in the core, bouncing forward with very small loss—the lifeline of modern communications.

**Example 4: telescopes and microscopes.** Two thin lenses in contact have an equivalent focal length satisfying $1/F=1/f_1+1/f_2$; a microscope magnifies with a short-focal objective and then again with a long-focal eyepiece, with total magnification about $M\approx (L/f_o)(25\ \text{cm}/f_e)$; a telescope collects light with a long-focal objective and magnifies the visual angle with a short-focal eyepiece. These instruments are engineering extensions of the thin-lens formula.

## VII. Concept Map and Common Exam Questions

The chapter on geometric optics grows from Fermat's principle, branches into reflection and refraction, merges into spherical-surface and thin-lens imaging, and finally bears magnification and various instruments. There are five typical kinds of exam questions. The first derives the laws of reflection or refraction from Fermat's principle, emphasizing variational thinking. The second concerns sign determination in the single-surface formula. The third finds image distance and magnification for a thin lens and decides whether the image is real or virtual, erect or inverted. The fourth deals with equivalent focal lengths of lens combinations (telescopes, microscopes). The fifth covers total internal reflection, optical fibres, and prism dispersion. Common errors: confused sign conventions, mistaking a virtual image for a real one, mixing up object- and image-space indices, and misusing the sign of the magnification. A suggested procedure: draw the ray diagram, fix the signs, then substitute into the formula—this avoids the vast majority of mistakes.

## VIII. Distinctions and Further Thoughts

**Distinction 1: optical path or geometric path?** Fermat's principle minimizes the optical path, not the geometric path; in a uniform medium the two differ only by a constant factor, so the conclusion is the same, but in a layered medium one must use the optical path, otherwise one is led to the false intuition that "light takes a shorter route in water". **Distinction 2: the sign of the focal length.** A convex lens does not always form a real image; with the object inside the focal point it forms a virtual one, and the sign of $f$ only indicates a converging or diverging tendency. **Distinction 3: magnitude and orientation of magnification.** $|m|$ gives the size, the sign gives the orientation; the two are independent, do not conflate them. Further thought: geometric optics fails when the wavelength cannot be neglected (the diffraction limit), and Fermat's principle is precisely the short-wavelength limit of wave optics; modern optical design (including the dozen or so elements in a phone camera, and lithography projection objectives) still uses these paraxial formulas as a first approximation and then corrects aberrations by numerical optimization. One may say that Fermat's principle, with a single extremal creed, buys the whole skeleton of imaging science, and also plants the unifying seed for our later understanding of "why light bends, interferes and diffracts".

## IX. Supplement: Aberrations, the Eye and the Camera

Ideal paraxial imaging is only a first approximation. Real lenses image rays far from the axis poorly, producing various **aberrations**. Spherical aberration prevents a wide beam from converging to a point; chromatic aberration, because the refractive index varies with wavelength ($n(\lambda)$ differs slightly), separates the focal points of different colours, and an achromatic doublet combines crown and flint glass to cancel it; there are also coma, astigmatism, field curvature and distortion. High-end lenses correct all of these with several elements of different curvatures and materials and tiny air gaps; a phone lens looks simple but often contains six or more elements.

The human eye is itself a variable-focus lens system: the cornea and the crystalline lens together have a total focal length of about $17\ \text{mm}$, forming an inverted real image on the retina which the brain then "turns upright". Myopia, from an overly long eyeball or too strong refraction, puts the image in front of the retina and needs a diverging concave lens; hyperopia is the opposite and needs a converging convex lens; presbyopia is the age-related loss of accommodative power of the lens and needs reading glasses. A camera is the engineering version of the eye: the aperture controls the amount of light and the depth of field (the smaller the $f$-number, the shallower the depth of field), the shutter controls the exposure time, and the sensor replaces the retina. All of this, traced to the bottom, is the engineering application of the thin-lens equation and the lateral magnification.

**Supplementary example**: a camera lens of focal length $f=50\ \text{mm}$ photographs a person $2\ \text{m}$ away; from $1/s+1/s^{\prime}=1/f$ we get $s^{\prime}\approx 50.1\ \text{mm}$, the lateral magnification is $m\approx -50.1/2000\approx -0.025$, and the image height is about $1/40$ of the object height, consistent with everyday experience. This again shows that recording the world "shrunk" onto film relies on the very same $m=-s^{\prime}/s$.`,
  },

  'wave-optics-intro': {
    chapter: 'Chapter 2 The Wave Nature of Light',
    title: "Huygens' Principle and Wavefronts",
    summary:
      'Huygens\' principle, with the geometric picture that "every point on a wavefront is a new secondary source", explains reflection, refraction and diffraction uniformly, and leads to the coherence conditions for light as a wave.',
    keyPoints: [
      'Huygens\' principle: every point on a wavefront acts as a source of secondary wavelets, and the new wavefront is their common envelope',
      'Reflection and refraction can be derived directly by Huygens construction',
      'The index $n=c/v$ shortens the wavelength in a medium to $\\lambda_n=\\lambda_0/n$',
      'Two beams interfere stably only if they satisfy the three coherence conditions: same frequency, same vibration direction, fixed phase difference',
      'A wavefront is a surface of constant phase, and rays are everywhere perpendicular to wavefronts',
      'Frequency is conserved across an interface; what changes is wavelength and wave speed',
    ],
    relatedProblemIds: ['optics-p2', 'optics-p3'],
    content: String.raw`

Geometric optics treats light as rays, but this picture has a fundamental flaw: it cannot explain why light bends around the edge of an obstacle, why a beam passing through a narrow slit spreads out on a screen, why two superimposed beams sometimes brighten and sometimes darken, or why soap bubbles show coloured fringes. To explain these, light must be regarded as a "wave", with wavefronts, phase, superposition and diffraction, like water waves and sound waves. The task of this chapter is to give an intuitive picture that describes how a wave propagates without sinking into heavy mathematics—Huygens' principle.

Imagine throwing a stone into a calm pond; the ripples are circles expanding outward. If you "freeze" one ring of crests with a camera, you find that every point on that ring seems to emit its own smaller circle, and the outer envelope of these small circles is exactly the next ring of crests. Huygens turned this into a principle: every point reached by a wave is a new source of secondary wavelets. This seemingly plain assertion unifies reflection, refraction and diffraction—three seemingly different phenomena—under one geometric operation, and is the hinge between geometric and wave optics. It tells us that light is not a bundle of unrelated rays but a continuously propagating wave field, and that every interfacial behaviour is the whole wavefront reorganizing itself.

## II. A Precise Statement of Huygens' Principle

Let the wavefront at some instant be $\Sigma$. Then every point of $\Sigma$ can be regarded as a secondary source emitting spherical wavelets, propagating with the wave speed $v$ in that medium. After a time $\Delta t$, the envelope of all these wavelets (the common tangent surface to all of them) is the new wavefront $\Sigma^{\prime}$ at $t+\Delta t$.

It must be stressed: it is the "envelope", not the simple sum of all wavelets. The envelope idea naturally explains why a wave usually propagates effectively forward only along the normal to the wavefront (the ray direction)—backward-travelling wavelets are cancelled by the forward-travelling part in constructing the envelope (Kirchhoff later added an obliquity factor to explain rigorously why there is no significant backward wave). When Huygens proposed it in 1678 it was only a geometric picture; not until Fresnel added the amplitude and phase of "coherent superposition of wavelets" more than a century later did it become the quantitative Huygens–Fresnel principle, which is the mathematical foundation of the interference and diffraction in the following chapters.

The relation between **wavefronts and rays** is also clarified: a wavefront is a surface of constant phase, and a ray is always perpendicular to the wavefront. In a uniform medium wavefronts are planes and rays are parallel; a point source emits spherical waves and rays radiate along radii; a distant star approximates a plane wave and its rays arrive parallel.

## III. Explaining Reflection and Refraction with Huygens' Principle

**Reflection**: a plane wave is incident obliquely on an interface; the points of the wavefront that touch the interface first emit wavelets first, those that touch later emit later. The envelope of these wavelets on the same side of the medium remains a plane, and the angle of incidence equals the angle of reflection, $\theta_i=\theta_r$, consistent with geometric optics.

**Refraction**: the key is that light has different speeds in the two media, $v_1=c/n_1$, $v_2=c/n_2$. Let the angle of incidence be $\theta_1$; after a time $\Delta t$ the wavefront advances $v_1\Delta t$ on the side of medium $1$ and $v_2\Delta t$ on the side of medium $2$. From the geometry over the same interface width,

$$\frac{\sin\theta_1}{\sin\theta_2} = \frac{v_1}{v_2} = \frac{n_2}{n_1}$$

that is, $n_1\sin\theta_1=n_2\sin\theta_2$, which is Snell's law. Here we see the essence of refraction: because light "travels more slowly" in the second medium, the wavefront bends at the interface so as to satisfy the timing of wave propagation as a whole. This also shows that **the refractive index is the reciprocal of the relative wave speed**, $n=c/v$, and directly implies that the wavelength in the medium is shortened, $\lambda_n=\lambda_0/n$, while **the frequency $f$ is unchanged across the interface**—a point crucial for understanding optical path difference and thin-film interference later, because phase accumulation depends on wavelength, and the wavelength has changed inside the medium.

## IV. The Language of Waves: Phase, Wavelength and Optical Path

Light as an electromagnetic wave has an electric field that can be written $E=A\cos(\omega t - k\cdot r + \varphi_0)$, where $\omega=2\pi f$ is the angular frequency and $k=2\pi/\lambda$ the wavenumber. On the same wavefront the phase $\omega t - k\cdot r + \varphi_0$ is everywhere equal—precisely the mathematical expression of "a wavefront is a surface of constant phase". When the phase difference at a point in space is an integer multiple of $2\pi$, the oscillations are synchronized; when it is an odd multiple of $\pi$, they are in antiphase.

As light passes through different media, the geometric distance $d$ does not directly determine the phase; what does is the **optical path** $L=nd$ (or in integral form $\int n\,ds$). The phase difference when two beams meet is

$$\delta = \frac{2\pi}{\lambda_0}\,\Delta L$$

where $\lambda_0$ is the vacuum wavelength, and the optical path difference $\Delta L$ converts all medium effects into an equivalent vacuum path difference. This formula is the hinge of all quantitative interference and diffraction calculations that follow—it translates "geometric path" into "phase difference", and interference patterns are determined by phase difference.

## V. Coherence Conditions: Why Some Superpositions Show No Fringes

When two beams meet, the intensity is not necessarily the simple sum. Let the field amplitudes be $E_1,E_2$; after superposition the time-averaged intensity is

$$I = I_1 + I_2 + 2\sqrt{I_1 I_2}\cos\delta$$

The last term is the interference term, proportional to $\cos\delta$. To see stable bright and dark fringes, $\delta$ must remain fixed at every point in space, which requires the two beams to satisfy **three coherence conditions**: (1) the same frequency; (2) a parallel component of vibration direction (otherwise the cross term vanishes); (3) a constant phase difference (or a stable statistical distribution).

Two ordinary independent sources (such as two lamps) have close frequencies but random phase fluctuations, so the interference term averages to zero—which is why interference experiments must split one source into two beams. A laser, with its highly ordered phase, has excellent coherence, making interference easy. Historically, Young in 1801 used a single source to illuminate two slits and succeeded in seeing interference, establishing the wave nature of light experimentally for the first time and for the first time measuring the order of magnitude of the wavelength.

## VI. Typical Calculations and Pictures

**Example 1: wavelength changes with the medium.** Sodium yellow light has vacuum wavelength $\lambda_0=589\ \text{nm}$; in water ($n=1.33$) the wavelength is $\lambda_n=589/1.33\approx443\ \text{nm}$. The frequency is unchanged (about $5.09\times10^{14}\ \text{Hz}$), so the perceived colour does not change, but the shortened wavelength directly affects the fringe spacing of subsequent interference.

**Example 2: finding the angle of refraction by Huygens construction.** See problem optics-p2: from $v_1/v_2$ one directly gets $\sin\theta_2/\sin\theta_1=v_2/v_1$, consistent with Snell's law, showing that refraction is the geometric result of "the wavefront twisting in the slow medium".

**Example 3: estimating a phase difference.** Two beams in air have optical path difference $\Delta L=1\ \mu\text{m}$ and $\lambda_0=500\ \text{nm}$; then the phase difference is $\delta=2\pi\times10^{-6}/(5\times10^{-7})=4\pi$, exactly constructive (an integer multiple of $2\pi$).

## VII. Concept Map and Common Exam Questions

This chapter centres on Huygens' principle: outward it explains reflection and refraction (the wave origin of geometric optics), inward it introduces wavefronts, phase and optical path (the language of wave optics), and downward it connects to the coherence conditions (the prerequisite of interference). Common questions: the first kind uses Huygens construction to explain reflection/refraction; the second computes the wavelength in a medium from $n=c/v$ and the wavelength relation; the third judges bright or dark from the interference intensity formula; the fourth distinguishes the three coherence conditions and explains why two lamps do not interfere; the fifth distinguishes optical path from geometric path. Common errors: thinking the frequency changes, inverting the relation between wave speed and wavelength, assuming any two beams can interfere, and conflating wavefronts with rays.

## VIII. Distinctions and Further Thoughts

**Distinction 1: wavefront and ray.** A wavefront is a surface of equal phase at one instant; a ray is the direction of energy propagation. They are perpendicular, not the same thing; in a non-uniform medium wavefronts curve and rays bend, but the perpendicular relation always holds. **Distinction 2: index and speed.** $n=c/v$: a denser medium has larger $n$ and smaller $v$—do not memorize it backwards; this also means the wavelength shortens rather than lengthens in the medium. **Distinction 3: why the interference term disappears.** The formula is not wrong; the random phase fluctuation makes the long-time average zero, and the energy simply has not been redistributed into fringes in space. Further thought: Huygens' principle is intuitive but needs Fresnel's "coherent superposition of wavelets" and "obliquity factor" to become a quantitative theory; and modern numerical simulations such as the beam propagation method (BPM) and finite-difference time-domain (FDTD) still have at their core the refined form of the plain idea "each point emits wavelets, all superpose coherently". Understand this chapter and you hold the key to wave optics—behind the door lie interference in Chapter 3 and diffraction in Chapter 4.

## IX. Supplement: Wave Packets, Group Velocity and the Huygens–Fresnel Principle

A monochromatic wave is an ideal infinite sinusoid, but a real light pulse is a **wave packet**, a superposition of waves of nearby frequencies. The carrier has phase velocity $v_p=\omega/k$, while the packet as a whole advances with **group velocity** $v_g=d\omega/dk$. In a dispersive medium the two differ and the pulse broadens—this explains why different colours "run at different speeds" in glass, and is one of the main sources of signal distortion in fibre communications. Treating light as a wave packet rather than an infinite monochromatic wave is the key step linking the "ideal wave picture" with "real finite pulses".

Huygens' principle is only a geometric picture; to get quantitative amplitudes one must add Fresnel's two supplements: **coherent superposition of wavelets** (each weighted, with phase included) and the **obliquity factor** (suppressing backward propagation). Together they form the Huygens–Fresnel principle, whose mathematical form is the Kirchhoff diffraction integral:

$$U(P) = \frac{1}{i\lambda}\iint_{\Sigma} U(Q)\,\frac{e^{ikr}}{r}\,K(\chi)\,dS$$

It states that the complex amplitude at any point $P$ on the screen is the superposition, with phase $kr$, of the contributions of all secondary sources $Q$ on the wavefront $\Sigma$. This integral is precisely the rigorous source of the single-slit and grating intensity distributions later (Chapter 4); one may say that all quantitative calculations of wave optics start from this formula.

Historically, when Huygens (1629–1695) proposed the principle he could not yet explain colour or interference; Newton advocated the corpuscular theory and, by his prestige, suppressed the wave theory for nearly a century. Only with Young's double-slit experiment (1801) and Fresnel's quantitative theory (1818), plus Maxwell's later proof that light is an electromagnetic wave, did the wave theory win outright. Knowing this debate helps us appreciate that a good principle (Huygens) needs good mathematics (Fresnel) and good experiments (Young) before it can truly stand.`,
  },

  interference: {
    chapter: 'Chapter 3 Interference of Light',
    title: "Young's Double Slit and Thin-Film Interference",
    summary:
      'When two coherent beams superpose, the optical path difference determines the phase difference and hence a stable pattern of bright and dark fringes in space; Young\'s double slit and thin-film (equal-thickness, equal-inclination) interference are the most typical applications of this idea.',
    keyPoints: [
      'Interference intensity $I=I_1+I_2+2\\sqrt{I_1I_2}\\cos\\delta$; bright or dark is decided by the phase difference $\\delta$',
      'Optical path difference $\\Delta L$ and phase difference are related by $\\delta=2\\pi\\Delta L/\\lambda_0$',
      'Young\'s double-slit bright fringes $x_k=k\\lambda D/d$, equally spaced',
      'Thin-film interference must include the half-wave loss: reflection from a rarer to a denser medium adds $\\lambda/2$ of optical path',
      'Equal-thickness fringes (wedge, Newton\'s rings) are localized at the film surface; equal-inclination fringes are localized at infinity',
      'White-light interference shows colour only near the centre—the physical basis of interference spectroscopy and antireflection coatings',
    ],
    relatedProblemIds: ['optics-p3'],
    content: String.raw`

Superimpose the light of two flashlights and it only gets brighter, never darker. But if you mask a source with a screen having two closely spaced narrow slits and let the light fall on a second screen, a series of bright and dark bands appears instead of a uniform bright patch. The brightest places are brighter than either beam alone, the darkest are completely black—energy seems to have been "redistributed". This redistribution of energy in space, producing a stable pattern of maxima and minima, is the interference of light: the most direct evidence of its wave nature, and the key experiment with which Young in 1801 shook the physics community and settled the wave theory of light.

Why do two everyday lamps not interfere? Because interference requires the phase difference of the two beams to be fixed at every point in space, whereas an ordinary source jumps randomly in phase, and long-time averaging wipes out the interference term. The cleverness of Young's experiment was to illuminate the double slit with a single source, "splitting" one beam into two naturally coherent wavelets, thus for the first time seeing interference fringes reliably. Since then, "split one beam into two and recombine" has been the universal recipe for interference experiments.

## II. The Quantitative Basis of Interference

Let two coherent beams have fields $E_1=E_{10}\cos(\omega t+\varphi_1)$ and $E_2=E_{20}\cos(\omega t+\varphi_2)$ at a point in space; the time-averaged intensity after superposition is

$$I = I_1 + I_2 + 2\sqrt{I_1 I_2}\cos\delta,\qquad \delta = \varphi_2 - \varphi_1$$

The last term is the interference term. When $\delta=2m\pi$ ($m$ an integer) the interference is constructive and brightest; when $\delta=(2m+1)\pi$ it is destructive and darkest. If the two amplitudes are equal ($I_1=I_2=I_0$), then $I=2I_0(1+\cos\delta)=4I_0\cos^2(\delta/2)$, giving $4I_0$ at the bright and $0$ at the dark, with very high contrast.

The phase difference comes from the optical path difference $\Delta L$:

$$\delta = \frac{2\pi}{\lambda_0}\,\Delta L$$

where $\lambda_0$ is the vacuum wavelength. So the ultimate criterion for bright or dark is the optical path difference:

$$\Delta L = \begin{cases} m\lambda_0 & \text{bright}\\ (m+\tfrac12)\lambda_0 & \text{dark} \end{cases}$$

This criterion turns "looking at fringes" into "computing an optical path difference", the computational core of the whole chapter.

## III. Young's Double-Slit Interference

In Young's experiment two slits separated by $d$ are illuminated by the same monochromatic light, at a distance $D\gg d$ from the screen. At a point a distance $x$ from the centre, the optical path difference from the two slits is $\Delta L \approx d\sin\theta \approx dx/D$ (paraxial). Hence

- Bright fringe centres: $x_k = k\frac{\lambda D}{d}\quad (k=0,\pm1,\pm2,\ldots)$
- Dark fringe centres: $x_{k+1/2} = (k+\tfrac12)\frac{\lambda D}{d}$

The spacing between adjacent bright (or dark) fringes is

$$\Delta x = \frac{\lambda D}{d}$$

independent of the order, so the fringes are equally spaced and symmetric about the central bright fringe. At the centre $k=0$ the optical path difference is zero, so it is always brightest. The spacing is proportional to $\lambda$ and $D$ and inversely proportional to $d$—exactly the basis for measuring wavelength by interference and for splitting light with a double slit. **With white light**, the centre is a white bright fringe and the sides spread into a coloured spectrum because $\Delta x$ grows with $\lambda$, violet inside and red outside; at higher orders the fringes of different colours overlap and wash out to white, so clear colours appear only near the centre.

## IV. Thin-Film Interference and the Half-Wave Loss

When light falls on a transparent film (soap film, oil film, lens coating), the light reflected from the front surface meets that reflected from the back and interferes. At normal (or near-normal) incidence, with film thickness $e$ and index $n$, the optical path difference of the two reflected beams is approximately

$$\Delta = 2 n e + \frac{\lambda_0}{2}$$

The extra term $\lambda_0/2$ comes from the **half-wave loss**: when light is reflected from a rarer to a denser medium its phase jumps by $\pi$, equivalent to an extra half wavelength of optical path. Whether to add this term depends on how many of the two reflections go from rarer to denser: an odd number means add, an even number means do not. This detail decides whether the film is bright ("where the thickness satisfies $2ne=m\lambda$") or dark, so one must judge it together with the actual indices at both interfaces—many problems hide their trap precisely here.

Because the thickness $e$ varies with position, thin-film interference falls into two classes. **Equal-thickness interference**: with nearly parallel light, places of equal thickness have the same interference condition, and the fringes are contours of equal thickness. Typical cases are the wedge (fringes are parallel, equally spaced straight lines, usable for measuring tiny angles or wire diameters) and Newton's rings (a plano-convex lens pressed on a flat glass plate, an air film in rings, with dark reflected ring radii $r_k=\sqrt{k\lambda R}$). **Equal-inclination interference**: with an extended source, light of the same angle of incidence forms fringes of the same order; the pattern is concentric rings localized at infinity, often used in Fabry–Pérot etalons for high-resolution spectroscopy.

## V. Typical Calculations and Engineering Applications

**Example 1: double-slit fringe positions.** See problem optics-p3: with $d=0.20\ \text{mm}$, $D=1.0\ \text{m}$, $\lambda=589\ \text{nm}$, the third-order bright fringe is at $x_3\approx8.84\ \text{mm}$ and the fringe spacing is about $2.95\ \text{mm}$.

**Example 2: Newton's rings.** For a plano-convex lens of radius $R=1.0\ \text{m}$ and $\lambda=589\ \text{nm}$, the fifth dark ring has radius $r_5=\sqrt{5\lambda R}\approx\sqrt{5\times589\times10^{-9}\times1}\approx1.72\ \text{mm}$. Newton's rings are often used to check the curvature and flatness of optical surfaces, to an accuracy of the order of a wavelength.

**Example 3: antireflection coating.** Coat glass ($n_g\approx1.5$) with a film of $n_f\approx1.22$ and thickness $e=\lambda/(4n_f)$, so that the reflections from the two interfaces cancel through the half-wave loss and the path difference; this greatly reduces reflection and raises transmission—the principle of coatings on camera lenses and spectacles. Conversely, a high-reflection coating makes a strong mirror.

**Example 4: the Michelson interferometer.** Split a beam into two paths, reflect each back and recombine; moving one mirror changes the optical path difference, and every shift of $\lambda/2$ moves the pattern by one fringe, so extremely small displacements can be measured. Its principle is two-beam interference, and it directly inspired the idea of gravitational-wave detection.

## VI. Concept Map and Common Exam Questions

The chapter on interference follows the main chain "optical path difference → phase difference → intensity", with two representatives: wavefront splitting (Young's double slit) and amplitude splitting (thin films). Common questions: the first finds fringe positions, spacing and wavelength for the double slit; the second judges bright or dark in a film including the half-wave loss; the third measures a tiny thickness or angle with a wedge; the fourth measures a radius of curvature with Newton's rings; the fifth designs antireflection/high-reflection coatings; the sixth explains the colours of white-light interference. Common errors: forgetting the half-wave loss, writing the optical path difference as $2e$ and omitting the index $n$, confusing equal-thickness with equal-inclination, mishandling white light versus monochromatic light, and inverting $\Delta x$ so that it appears proportional to $d$.

## VII. Distinctions

**Distinction 1: is energy conserved?** Interference neither creates nor destroys energy; it merely "moves" energy from the dark fringes to the bright ones, the total is conserved, and the overall average intensity is still $I_1+I_2$. **Distinction 2: when is the half-wave loss added?** Look at whether each reflection goes from rarer to denser; the numbers experienced by the two reflected beams decide whether there is a relative $\lambda/2$ difference; transmitted light generally acquires no extra half-wave loss. **Distinction 3: which fringes are localized?** Double-slit fringes can be seen anywhere on the screen (non-localized to a good approximation); equal-thickness film fringes are localized near the film surface and need close observation or imaging with a lens; equal-inclination fringes are localized at infinity and are sharp only when focused at infinity.

## VIII. Further Thoughts

Interference is not only a beautiful experiment but a precision-measurement tool: from measuring wavelength, index and tiny displacements (to a fraction of a wavelength, about a hundred nanometres) to reading the path difference over kilometre-scale arms in gravitational-wave detectors, the essence is always turning "length" into "bright or dark". Modern interferometers (Michelson, Mach–Zehnder, Fabry–Pérot) push the ideas of this chapter to their limit, and understanding them requires a firm grasp of "the optical path difference decides everything". In the next chapter we shall see that when the slit is not two but one narrow slit, or many closely spaced grating lines, the same superposition principle gives another kind of pattern—diffraction, which shares its origin with interference, the only difference being that the superposing wavelets come from a continuous wavefront rather than two discrete sources.

## IX. Supplement: The Michelson Interferometer and Applications of Interference

The classic device that turns interference from "looking at fringes" into "measuring length" is the **Michelson interferometer**: a beam is split into two paths by a beam splitter, reflected by two mirrors and recombined, and the optical path difference $\Delta L=2(d_1-d_2)$ decides bright or dark. Moving one mirror by $\lambda/2$ moves the pattern by one fringe; counting fringes reads off a tiny displacement to a fraction of a wavelength (about a hundred nanometres). It was used in the Michelson–Morley experiment that refuted the ether, and is the conceptual prototype of modern laser interferometric gravitational-wave detectors (LIGO)—LIGO makes each arm four kilometres long and, with frequency-stabilized lasers, pushes the displacement sensitivity to $10^{-19}\ \text{m}$ (a thousandth of a proton diameter).

**White-light interference** also has its uses. White light has a coherence length of only about a wavelength, so fringes appear as a few coloured lines only near $\Delta L\approx 0$, with the zero-order centre white. This enables **equal-thickness white-light interferometry for thickness measurement**: put the film in one arm and move the reference mirror until the coloured fringes reappear, then read off the thickness—the basis of optical profilometers and thin-film thickness monitoring.

**Equal-inclination interference and the Fabry–Pérot etalon**: two parallel highly reflecting mirrors form a cavity, and multi-beam interference produces extremely sharp transmission peaks, with free spectral range $\Delta\lambda_{\text{FSR}}=\lambda^2/(2nd)$ and finesse $F=\pi\sqrt{R}/(1-R)$. It is both the model of a laser cavity and the core component of high-resolution spectral analysis.

**Antireflection and high reflection**: coating a camera lens with a film of $n_f\approx\sqrt{n_g}$ and thickness $e=\lambda/(4n_f)$ makes the two reflections cancel through the half-wave loss and the path difference, lowering the reflectance below $1\%$; conversely, alternating high- and low-index layers can give nearly $100\%$ reflection (laser mirrors, heat-insulating glass). These designs all reduce to one sentence: control the optical path difference to control the sign of the interference term.

**An application of Newton's rings**: press an optical flat against the surface under test; concentric rings at the contact indicate that the surface is not flat, and the ring radius $r_k=\sqrt{k\lambda R}$ gives the curvature or the gap. Factories use this to check lens surfaces quickly, far more efficiently than grinding by trial and error. Interference is thus not only a physical phenomenon but the most precise "ruler" in human hands.

## X. A Complete Derivation of the Double-Slit Fringe Formula

The previous sections quoted the paraxial optical path difference $\Delta L\approx d\sin\theta\approx dx/D$ directly. It is worth deriving from scratch, because it recurs in spatial coherence, the grating equation and white-light interference; only by knowing where it comes from and where it holds can one apply it correctly in different setups.

Let the slits $S_1,S_2$ be separated by $d$, with the slit plane parallel to the observation screen at distance $D$. Take the intersection $O^{\prime}$ of the perpendicular bisector with the screen as origin, let the coordinate of $P$ on the screen be $x$, and assume $D\gg d$, $D\gg x$. The geometric distances from the two slits to $P$ are

$$r_1 = \sqrt{D^2 + \left(x - \frac{d}{2}\right)^2},\qquad r_2 = \sqrt{D^2 + \left(x + \frac{d}{2}\right)^2}$$

In air ($n\approx 1$) the optical path difference equals the geometric one, $\Delta L = r_2 - r_1$. Expand $\sqrt{D^2+u^2} = D\sqrt{1+u^2/D^2}$ binomially and keep terms to second order:

$$\sqrt{D^2+u^2} \approx D + \frac{u^2}{2D}\qquad (u\ll D)$$

Keeping second order is necessary here—the zeroth-order term $D$ cancels in the subtraction, the first-order term is absent, and only the second-order term contributes to the final result. Substituting,

$$r_2 - r_1 \approx \frac{1}{2D}\left[\left(x + \frac{d}{2}\right)^2 - \left(x - \frac{d}{2}\right)^2\right] = \frac{2xd}{2D} = \frac{xd}{D}$$

Since paraxially $\tan\theta\approx\sin\theta\approx\theta$ and $\tan\theta = x/D$, the three forms are completely equivalent:

$$\Delta L \approx d\sin\theta \approx d\tan\theta = \frac{xd}{D}$$

Substituting the bright-fringe condition $\Delta L = k\lambda$ immediately gives $x_k = k\lambda D/d$ and $\Delta x = \lambda D/d$.

**This derivation carries three cautions.** First, the exact relation is $\Delta L = d\sin\theta$; writing $xd/D$ is only a small-angle approximation (error below $0.3\%$ for $\theta\lesssim 5^{\circ}$); for large angles or oblique incidence on many slits one must return to the sine form. Second, if the whole apparatus is immersed in a medium of index $n$, the wavelength must be the in-medium wavelength $\lambda_n = \lambda_0/n$, and the fringe spacing shrinks to $\Delta x = \lambda_0 D/(nd)$—exactly the basis for measuring the refractive index of a gas interferometrically. Third, in $\delta = 2\pi\Delta L/\lambda_0$ the $\lambda_0$ is the vacuum wavelength and must not be mixed with the in-medium wavelength, or one gains or loses a factor of $n$.

## XI. A Comprehensive Worked Example

**Example: the colour reflected by a soap film, and inverting for its thickness.**

White light falls normally on a soap film in air, index $n = 1.33$, thickness $e = 320\ \text{nm}$. (1) Which visible wavelengths ($400\sim 760\ \text{nm}$) are enhanced in the reflected light? (2) For another film of the same kind, the reflected light at $\lambda = 600\ \text{nm}$ is exactly the third-order bright fringe; find the thickness there.

**Step 1: count the half-wave losses.** Reflection at the upper surface goes from air ($n_0 = 1.00$) to film ($n = 1.33$), rarer to denser, so there is a $\pi$ phase jump; reflection at the lower surface goes from film to air, denser to rarer, so there is none. Hence the two reflected beams differ by an extra half wavelength, and the total optical path difference is

$$\Delta = 2ne + \frac{\lambda_0}{2}$$

**Step 2: write the enhancement condition and solve.** Constructive interference requires $\Delta = m\lambda_0$ ($m = 1,2,3,\ldots$), i.e.

$$2ne = \left(m - \frac12\right)\lambda_0 \quad\Longrightarrow\quad \lambda_0 = \frac{2ne}{m - 1/2} = \frac{4ne}{2m-1}$$

First the numerator: $2ne = 2\times 1.33\times 320\ \text{nm} = 851.2\ \text{nm}$. Substituting orders one by one:

$$m=1:\ \lambda_0 = \frac{851.2}{0.5} = 1702\ \text{nm}\ (\text{infrared, invisible})$$

$$m=2:\ \lambda_0 = \frac{851.2}{1.5} \approx 567.5\ \text{nm}\ (\text{yellow-green, visible})$$

$$m=3:\ \lambda_0 = \frac{851.2}{2.5} \approx 340.5\ \text{nm}\ (\text{ultraviolet, invisible})$$

Only $567.5\ \text{nm}$ in the visible range is enhanced, so the film looks yellow-green in reflected light. **Physical intuition**: the other wavelengths in white light are suppressed in reflection and enhanced in transmission, so the reflected light is not white but a "selectively tinted" single colour—exactly why oil films on water and soap bubbles show colours.

**Step 3: invert for the thickness.** Solve the same formula for $e$ with $m=3$, $\lambda_0 = 600\ \text{nm}$:

$$e = \frac{\left(m - \frac12\right)\lambda_0}{2n} = \frac{2.5\times 600\ \text{nm}}{2\times 1.33} \approx 564\ \text{nm} = 0.564\ \mu\text{m}$$

**Check**: substituting $e = 564\ \text{nm}$ back gives $2ne = 1500\ \text{nm}$; dividing by $\lambda_0 = 600\ \text{nm}$ gives $2.5$, exactly the required $m - 1/2$—self-consistent.

## XII. Advanced Pitfall Checklist and Self-Test

The five items below are where marks are most often lost in homework and exams; checking each one raises the score effectively.

- **Mixing signs and approximations**: writing $\Delta L$ as $2e$ and omitting the index $n$; or still using $xd/D$ at large angles. The right way is to write the exact geometric distance first, then decide whether to approximate.
- **Order of judgement for the half-wave loss**: one must judge separately whether each of the two reflections is "rarer$\to$denser" or "denser$\to$rarer", then see whether the two differ by an odd number; for transmitted light one usually adds no $\lambda/2$—never copy the conclusion for reflection.
- **Confusing optical path with geometric path**: optical path $= n\times$ geometric path; a beam crossing different media must be multiplied segment by segment and then added, not handled with one overall $n$.
- **Misaligning bright and dark conditions**: with an extra half-wave difference the bright condition changes from $2ne = m\lambda$ to $2ne = (m-1/2)\lambda$; always decide "with or without the extra" before applying a formula, and do not memorize one form blindly.
- **Misreading "disappearing" fringes**: fringes disappearing does not mean the light is gone, but that the interference term averages to zero and the screen returns to uniform $I_1+I_2$ illumination; the total energy is always conserved.

**Self-test**: if you can explain in one sentence "why a lens with an antireflection coating looks purplish" (hint: the middle of the visible range is designed to cancel, leaving more residual reflection at the red and blue ends), then your grasp of the main line "the optical path difference decides bright or dark" is in place, and you may safely move on to diffraction.`,
  },

  diffraction: {
    chapter: 'Chapter 4 Diffraction of Light',
    title: 'Single-Slit Diffraction and Gratings',
    summary:
      'Light bending around obstacles and deviating from straight-line propagation is diffraction; the Fresnel half-period zone method handles single-slit Fraunhofer diffraction, while a grating of many slits combines interference and diffraction into extremely sharp principal maxima and becomes the core of precision spectroscopy.',
    keyPoints: [
      'Diffraction is a wave bending around obstacles and departing from straight-line propagation—the other face of the wave nature',
      'Fraunhofer diffraction means far-field diffraction with both source and screen at infinity (realized with lenses)',
      'Single-slit dark fringes: $a\\sin\\theta = k\\lambda$; the central maximum is widest and brightest',
      'Grating equation $d\\sin\\theta = k\\lambda$ gives extremely sharp principal maxima, with missing orders set by the single-slit envelope',
      'Grating resolving power $R=\\lambda/\\Delta\\lambda = kN$ ($N$ the number of illuminated slits)',
      'The diffraction limit $\\Delta x\\sim\\lambda/(2\\text{NA})$ is the upper bound on the resolution of all optical imaging',
    ],
    relatedProblemIds: ['optics-p4'],
    content: String.raw`

Geometric optics says light travels in straight lines, but that is only an approximation. Squint at a street lamp through your fingers and radial streaks leak through the gaps; a CD flashes rainbow colours in sunlight; blinds cast a shadow on the wall whose edge is not sharp; even the light passing between your eyelashes when you squint forms a star. These are all evidence that light "bends" around obstacles or spreads after passing a narrow slit—collectively called **diffraction**. Diffraction and interference share the same origin: both are coherent superposition of wavelets; the difference is only where the superposing wavelets come from—a double slit has two discrete sources, whereas diffraction superposes infinitely many wavelets from a continuous wavefront.

The importance of diffraction goes far beyond "pretty patterns": it sets the resolution limit of any optical system (including the eye, telescopes, microscopes and lithography machines)—no lens, however good, can resolve detail smaller than a wavelength. This is the **diffraction limit**. Understanding diffraction means understanding the physical boundary of "seeing clearly", and why microscopes use short wavelengths and telescopes are built large. This chapter goes from the "spreading" of a single slit to the "sharp peaks" of a grating, the theoretical core of modern spectroscopy and high-resolution imaging.

## II. The Fresnel Half-Period Zone Method

Consider a slit of width $a$, with parallel monochromatic light at normal incidence, and a lens focusing the far field (Fraunhofer diffraction) onto the focal-plane screen. Divide the wavefront at the slit into parallel strips such that the optical paths to a point $P$ on the screen differ successively by $\lambda/2$; these are the **half-period zones**. Adjacent zones produce vibrations at $P$ differing in phase by exactly $\pi$, and nearly cancel.

If the optical path difference from the two edges of the slit to $P$ is exactly $k\lambda$ ($k$ an integer), the slit is divided into an even number of half-period zones which cancel in pairs, and $P$ is dark:

$$a\sin\theta = k\lambda\qquad (k=\pm1,\pm2,\ldots)$$

If $a\sin\theta=(k+\tfrac12)\lambda$, an odd number of zones can be matched, one is left uncancelled, and a secondary bright fringe forms (much weaker than the central one). At $\theta=0$ all wavelets superpose in phase, giving the widest and brightest **central maximum**. Its half-angular width is about $\Delta\theta\approx\lambda/a$: the narrower the slit, the more pronounced the diffraction—the quantitative statement of "only a narrow slit spreads noticeably", and an instance of the general wave rule "the tighter the confinement, the wider the spread".

## III. The Single-Slit Pattern

The intensity distribution of single-slit Fraunhofer diffraction is

$$I(\theta) = I_0\left[\frac{\sin\beta}{\beta}\right]^2,\qquad \beta = \frac{\pi a\sin\theta}{\lambda}$$

It reaches its maximum $I_0$ at $\beta=0$ (the centre) and vanishes at $\beta=\pm\pi,\pm2\pi,\ldots$, i.e. $a\sin\theta=\pm\lambda,\pm2\lambda,\ldots$ (the dark fringes). Bright fringes lie between the zeros but their intensity falls off rapidly (the first side lobe is only about $4.5\%$ of the centre). The pattern is characterized by an extremely wide and bright central band, flanked symmetrically by ever weaker dark–bright–dark structures. Unlike the double slit, the bright fringes here are not equally spaced—it is the dark positions $a\sin\theta=k\lambda$ that are strictly equally spaced, while the bright positions are given by $\tan\beta=\beta$ and shifted slightly inward.

## IV. Gratings: Interference and Diffraction of Many Slits Combined

A **grating** consists of many equally spaced parallel slits with spacing (the grating constant) $d$. Each slit produces single-slit diffraction, and between slits multi-beam interference occurs. The principal maxima of the multi-slit interference are located by

$$d\sin\theta = k\lambda\qquad (k=0,\pm1,\pm2,\ldots)$$

called the **grating equation**. Unlike the double slit, the principal maxima of many slits are "shaved" extremely narrow and sharp, while their intensities are modulated by the single-slit envelope $\left[\sin\beta/\beta\right]^2$. The more slits, the narrower and brighter the principal maxima, the wider the dark regions, and the greater the resolving power.

**Missing orders**: when the direction of a principal maximum falls exactly on a dark direction of the single-slit diffraction (satisfying both $d\sin\theta=k\lambda$ and $a\sin\theta=m\lambda$), that order vanishes. If $d/a$ is an integer ratio, the corresponding orders are missing and some expected bright fringes "disappear" from the pattern.

**Resolving power**: the ability of a grating to separate two nearby wavelengths,

$$R = \frac{\lambda}{\Delta\lambda} = kN$$

where $N$ is the total number of illuminated slits. More slits and higher orders give greater resolving power. This is the theoretical basis for grating spectrometers replacing prisms in precision spectroscopy—prisms rely on the index varying with wavelength, gratings on the sharp peaks of multi-slit interference.

## V. Typical Calculations and Instruments

**Example 1: the central width of a single slit.** Slit width $a=0.10\ \text{mm}$, $\lambda=500\ \text{nm}$, lens focal length $f=50\ \text{cm}$. The half-angular width of the central maximum is $\theta_1\approx\lambda/a=5\times10^{-3}\ \text{rad}$, the half-width on the screen is $x_1=f\theta_1=2.5\ \text{mm}$, and the full width is $5.0\ \text{mm}$. With $a=0.05\ \text{mm}$ the width doubles and diffraction is more pronounced.

**Example 2: grating dispersion.** See problem optics-p4: a grating with $500$ lines per millimetre has $d=2.0\ \mu\text{m}$; for $\lambda=589.3\ \text{nm}$ the highest visible order is $k_{\max}=3$ and the first-order diffraction angle is about $17.1^{\circ}$; different wavelengths are separated because their $\theta$ differ, enabling spectral analysis. With white light each order is a continuous spectrum, and at high orders the spectra overlap.

**Example 3: the resolution limit.** A telescope of aperture $D$ has a minimum resolvable angle about $\theta_{\min}\approx1.22\lambda/D$ (circular-aperture diffraction); the larger the aperture the finer the resolution—the fundamental motive for building giant telescopes.

## VI. Concept Map and Common Exam Questions

The diffraction chapter unifies single slits and gratings by "continuous superposition of wavelets": single slit gives the dark-fringe condition by half-period zones, grating gives the grating equation by multi-slit interference, and the single-slit envelope then produces missing orders and the intensity profile. Common questions: the first computes single-slit dark fringes and the central width; the second uses the grating equation to find orders and diffraction angles; the third judges missing orders; the fourth computes the resolving power $R=kN$; the fifth distinguishes diffraction from interference; the sixth treats the resolution limit and instrument apertures. Common errors: writing the single-slit dark fringe as $a\sin\theta=(k+1/2)\lambda$ (that is the bright-fringe approximation), confusing full width with half width, missing missing orders, assuming unlimited grating orders, and taking the zeros of $\sin\beta/\beta$ for bright fringes.

## VII. Distinctions

**Distinction 1: interference or diffraction?** Both are coherent superposition; by convention "finitely many discrete sources" is called interference and "infinitely many wavelets on a continuous wavefront" is called diffraction, but they usually coexist (the grating is typical: interference between slits, diffraction within a slit). **Distinction 2: principal maximum and central maximum.** The grating principal maxima come from multi-slit interference, while the envelope peak at $\theta=0$ is decided by the single-slit central maximum; the two are on different conceptual levels. **Distinction 3: resolving power vs dispersion.** Dispersion decides the angular spread (how fast the angle changes with wavelength), resolving power decides whether two close lines can be separated; they are not the same, and high dispersion does not guarantee high resolution.

## VIII. Further Thoughts

The diffraction limit tells us that the resolution of any imaging system is about $\Delta x\sim\lambda/(2\text{NA})$, finer for shorter wavelengths—which directly drives ultraviolet lithography and electron microscopy (the de Broglie wavelength of electrons is extremely short). And gratings amplify "the angle changes with wavelength" into precision spectra, the pillar of modern astronomy's analysis of stellar composition and of chemistry's molecular fingerprints. From the iridescence between your fingers to the calibration of the Hubble telescope, diffraction links everyday observation with the most advanced observational technology; it is also the direct experimental manifestation of the "spatial coherence" discussed in the next chapter—when the source is not "pointlike" enough, the diffraction pattern itself is smeared. Understand diffraction and you understand "why even the best microscope has a visible end", the boundary where optics moves from ideal to real.

## IX. Supplement: Fresnel Diffraction, Circular Apertures and the Resolution Limit

The Fraunhofer diffraction discussed above is a "far-field" approximation (source and screen both at infinity, realized with lenses). If the observation point is not far from the obstacle, we have **Fresnel diffraction**, and the Kirchhoff integral must be analysed directly with half-period zones: the zones around a point on the wavefront are no longer equally spaced in area, near-axis zones contribute more and far ones less, and the superposition gives a continuous transition from "light still present inside the geometric shadow" to "bright fringes". The Fresnel zone method also explains the zone plate—blocking the even zones makes the amplitude at the focus grow greatly, equivalent to a converging lens, with multiple foci, a practical element for focusing X-rays.

**Circular-aperture diffraction and the Airy disk**: most optical systems have circular apertures; the Fraunhofer pattern has a central bright spot (the Airy disk) surrounded by concentric rings, with intensity

$$I(\theta)=I_0\left[\frac{2J_1(ka\sin\theta)}{ka\sin\theta}\right]^2$$

The angular radius of the central spot (first dark ring) is $\theta_1\approx1.22\lambda/D$. This is exactly why telescopes, microscopes and the eye "cannot see smaller detail": the **Rayleigh criterion** states that two point sources are just resolved when the centre of one Airy disk falls on the first dark ring of the other, i.e. the minimum resolvable angle is $\theta_{\min}\approx1.22\lambda/D$. Larger $D$ gives finer resolution; hence the motive for large telescopes and short wavelengths (ultraviolet, electrons).

**X-ray diffraction and Bragg's law**: atoms in a crystal form a periodic lattice that acts as a three-dimensional grating. X-rays have wavelengths of the same order as the lattice constant, and when the Bragg condition

$$2d\sin\theta = m\lambda$$

is met there is strong reflection, from which the crystal structure can be determined—the DNA double helix was revealed exactly by X-ray diffraction (the famous "cross" pattern in the photograph). This is a great application of diffraction extended from visible light to the analysis of matter.

**More applications of gratings**: the angular dispersion of a grating is $d\theta/d\lambda= m/(d\cos\theta)$, larger for higher orders and smaller grating constants; combined with the resolving power $R=kN$, astronomical grating spectrometers can resolve extremely fine absorption lines in stellar atmospheres, reading off chemical composition and temperature. From the iridescence between your fingers to decoding starlight from ten billion light years away, diffraction runs through every scale from daily life to the cosmos.

## X. Rigorous Integral Derivation of the Intensity Distribution

The previous sections used half-period zones only to locate the dark fringes; here we integrate the intensity distribution $I(\theta)=I_0\left[\sin\beta/\beta\right]^2$ from scratch, and see along the way why the side lobes are only a few percent of the central brightness.

Place a slit of width $a$ along $x$, with $x\in[-a/2,\,a/2]$. In the Fraunhofer approximation, the element $\mathrm{d}x$ at $x$ has an optical path to the far-field direction $\theta$ longer by $x\sin\theta$ than the centre, corresponding to a phase lag $kx\sin\theta$, with $k = 2\pi/\lambda$. By Huygens–Fresnel superposition, write the complex amplitude of the whole slit as the sum of the element contributions:

$$U(\theta) = C\int_{-a/2}^{a/2} e^{ikx\sin\theta}\,\mathrm{d}x = C\,\frac{e^{ika\sin\theta/2} - e^{-ika\sin\theta/2}}{ik\sin\theta} = Ca\,\frac{\sin\beta}{\beta},\qquad \beta = \frac{\pi a\sin\theta}{\lambda}$$

Taking the squared modulus gives the intensity distribution

$$I(\theta) = I_0\left(\frac{\sin\beta}{\beta}\right)^2,\qquad I_0 = (Ca)^2$$

Three conclusions follow directly. First, as $\beta\to 0$, $\sin\beta/\beta\to 1$, so at $\theta=0$ we have $I=I_0$, the maximum. Second, at $\beta = m\pi\ (m=\pm1,\pm2,\ldots)$ the numerator vanishes and the intensity is zero—exactly the dark-fringe condition $a\sin\theta = m\lambda$. Third, the maxima between adjacent zeros are determined by the extremum equation $\tan\beta = \beta$, whose solutions are $\beta\approx 4.493,\ 7.725,\ 10.904$, giving

$$\frac{I_1}{I_0} = \left(\frac{\sin 4.493}{4.493}\right)^2 \approx 0.047,\qquad \frac{I_2}{I_0} \approx 0.016,\qquad \frac{I_3}{I_0}\approx 0.008$$

that is, the first side lobe is only about $4.7\%$ of the centre, the second about $1.6\%$—a very rapid decay. This is why the single-slit pattern "looks like just one bright central band". Note especially: the side lobes are not centred between two dark fringes but shifted slightly toward the centre, because the maxima satisfy the transcendental equation $\tan\beta=\beta$, not $\beta=(m+\tfrac12)\pi$. This is the detail most easily misremembered in this chapter.

## XI. A Comprehensive Worked Example

**Example: joint calculation of grating missing orders and resolving power.**

A transmission grating has $600$ lines per millimetre, slit width $a = 1.0\ \mu\text{m}$, total illuminated width $W = 2.0\ \text{cm}$, and is illuminated normally by sodium yellow light $\lambda = 589.3\ \text{nm}$. (1) Find the grating constant $d$, the diffraction angle of the second-order principal maximum and the highest visible order. (2) Determine which orders are missing and whether this actually affects the visible pattern. (3) Determine whether the grating can resolve the sodium doublet $D_1 = 589.6\ \text{nm}$ and $D_2 = 589.0\ \text{nm}$ in the second-order spectrum.

**Step 1: grating constant and visible orders.** With $600$ lines per millimetre,

$$d = \frac{1.0\times10^{-3}\ \text{m}}{600} = 1.667\ \mu\text{m} = 1.667\times10^{-6}\ \text{m}$$

From the grating equation $d\sin\theta = k\lambda$ with $\sin\theta\le 1$:

$$k_{\max} = \left\lfloor\frac{d}{\lambda}\right\rfloor = \left\lfloor\frac{1.667\times10^{-6}}{5.893\times10^{-7}}\right\rfloor = \lfloor 2.83\rfloor = 2$$

The second-order diffraction angle follows from $\sin\theta_2 = 2\lambda/d$:

$$\sin\theta_2 = \frac{2\times 5.893\times10^{-7}}{1.667\times10^{-6}} \approx 0.707,\qquad \theta_2 \approx 45.0^{\circ}$$

So five principal maxima, $k = 0,\pm1,\pm2$, are visible.

**Step 2: missing orders.** A missing order requires the principal maximum direction to fall exactly on a zero of the single-slit diffraction, i.e. both $d\sin\theta = k\lambda$ and $a\sin\theta = m\lambda$. Dividing the two eliminates $\sin\theta$ and $\lambda$:

$$\frac{d}{a} = \frac{k}{m}\quad\Longrightarrow\quad k = m\,\frac{d}{a}$$

Here $d/a = 1.667/1.00 = 5/3$, so $k = 5m/3$; taking $m = 3$ gives the integer $k = 5$, i.e. the $5,10,\ldots$ orders are missing. But Step 1 already showed that the highest visible order is only $2$, so **the missing orders do not fall in the visible range**, and none of the five observed principal maxima is missing. This is the common trap: one must compute $k_{\max}$ before discussing missing orders, otherwise the answer contradicts reality. If instead $a = 0.833\ \mu\text{m}$ ($d/a = 2$), then $k = 2m$ and the $k=\pm2$ orders are missing—only then are two bright fringes genuinely lost.

**Step 3: resolving power.** The total number of illuminated slits is

$$N = \frac{W}{d} = \frac{2.0\times10^{-2}\ \text{m}}{1.667\times10^{-6}\ \text{m}} \approx 1.2\times10^{4}$$

The resolving power in second order is

$$R = kN = 2\times 1.2\times10^{4} = 2.4\times10^{4}$$

while the minimum resolving power needed for the sodium doublet is

$$R_{\text{need}} = \frac{\bar\lambda}{\Delta\lambda} = \frac{589.3\ \text{nm}}{0.6\ \text{nm}} \approx 9.8\times10^{2}$$

Since $R = 2.4\times10^{4} \gg 9.8\times10^{2}$, a margin of $24$ times, the grating easily resolves the sodium $D$ doublet in second order. **Two pitfalls**: first, the resolving power must include the order $k$; omitting it halves the result. Second, $\Delta\lambda$ must be the true wavelength difference of the doublet, $0.6\ \text{nm}$, not some other quantity such as the line half-width.

## XII. Advanced Pitfall Checklist and Self-Test

The six items below cover the main sources of lost marks in this chapter.

- **Swapping dark and bright formulas**: the single-slit dark fringes are $a\sin\theta = k\lambda$ ($k=\pm1,\pm2,\ldots$, not including $0$); the secondary maxima are given by $\tan\beta=\beta$ and cannot be approximated by $(k+\tfrac12)\lambda$.
- **Confusing half width and full width**: the half width of the central maximum is $\Delta x = f\lambda/a$, the full width twice that, $2f\lambda/a$.
- **Not checking the visible range for missing orders**: find $k_{\max}$ first, then see whether a missing order falls within $|k|\le k_{\max}$.
- **Confusing resolving power with angular dispersion**: $R = kN$ decides whether two lines can be separated, while angular dispersion $D_\theta = k/(d\cos\theta)$ decides how far apart they are; they are different concepts, and high dispersion does not imply high resolution.
- **Allowing $\sin\theta > 1$**: if a computed $\sin\theta$ for some order exceeds 1, that order does not exist; do not force an arcsine.
- **Taking $N$ as the line density**: $N$ is the "total number of illuminated slits", the total width divided by the grating constant; if the problem gives lines per millimetre, convert first.

**Self-test**: if the illuminated width of the same grating is doubled (with $d$ and $\lambda$ unchanged), how do the positions of the principal maxima, their half-widths, and the resolving power change? (Answer: positions unchanged, half-widths halved, resolving power doubled.) Being able to answer this shows that you have truly grasped the main line of the diffraction chapter: "interference fixes the positions, diffraction fixes the envelope, the number of slits fixes the sharpness".`,
  },

  polarization: {
    chapter: 'Chapter 5 Polarization of Light',
    title: 'Polarization States and Malus\'s Law',
    summary:
      'Light is a transverse wave, and the vibration direction of its electric vector can take a particular orientation relative to the propagation direction; linear, partial and elliptical polarization form the family of polarization states, and Malus\'s law together with the Brewster angle describes how polarized light behaves at media and interfaces.',
    keyPoints: [
      'The transverse nature of light means the electric field is perpendicular to the propagation direction, with a specific vibration direction',
      'Natural light can be decomposed into two incoherent, equal-amplitude orthogonal linear polarizations; linear polarization has a fixed vibration direction',
      'Malus\'s law $I=I_0\\cos^2\\theta$ gives the intensity of linearly polarized light after an analyser',
      'The Brewster angle satisfies $\\tan\\theta_B=n_2/n_1$; the reflected light is then completely linearly polarized',
      'In a birefringent crystal the o-ray and e-ray have different indices and perpendicular polarization directions',
      'A quarter-wave plate converts linear into circular/elliptical polarization—a basic element of light modulation',
    ],
    relatedProblemIds: ['optics-p5'],
    content: String.raw`

The particles of a longitudinal wave (such as sound) vibrate along the propagation direction, so there is no further "direction" to discuss—push a spring and the disturbance can only travel along the line. But light is a transverse wave: its electric vector vibrates perpendicular to the propagation direction. Now comes the question: the plane perpendicular to the propagation direction is two-dimensional, and the electric field can jitter in any direction within it. An ordinary source (the sun, a filament) emits from vast numbers of atoms at random, and the field direction changes rapidly and randomly in this plane—such light is called **natural light**. But if we can arrange for the field to vibrate along one fixed direction, we obtain **linearly polarized light**—as if the light had been "combed" in one direction.

Why does polarization matter? Because only transverse waves can be polarized, and proving that light is transverse was precisely the historical significance of polarization (Young proposed the transverse-wave theory in 1817 and Fresnel used it to explain polarization); in modern life, LCD screens, 3D cinema glasses, polarizing sunglasses, camera polarizers, stress analysis of materials and sugar-concentration measurement all exploit polarization. To understand polarization is to understand how to "filter" and "rotate" the vibration direction of light, and to enter the study of how light interacts with anisotropic matter.

## II. Classification of Polarization States

In the plane perpendicular to the propagation direction, the path traced by the tip of the electric vector over time determines the polarization state:

- **Linear polarization**: the path is a straight line, the electric vector always vibrating along one fixed direction.
- **Circular/elliptical polarization**: the path is a circle or ellipse, which can be seen as the superposition of two orthogonal linear polarizations of unequal amplitude with phase difference $\pm\pi/2$.
- **Natural light**: the vibrations in two orthogonal directions are completely incoherent, of equal amplitude and random, with no fixed phase relation.
- **Partially polarized light**: a mixture of natural and fully polarized light, with degree of polarization $P=(I_{\max}-I_{\min})/(I_{\max}+I_{\min})$.

Natural light can equivalently be regarded as the sum of two mutually perpendicular, half-intensity, mutually incoherent linear polarization components. Any polarization state can be obtained by superposing suitable two orthogonal linear components—the central technique for handling polarization problems. In particular, two orthogonal linear polarizations of equal amplitude with phase difference $\pi/2$ combine into circular polarization; other differences give elliptical polarization, and the orientation and handedness of the ellipse encode the details of the phase difference.

## III. Polarization and Analysis: Malus's Law

Passing natural light through a device that transmits vibrations in only one direction (a **polarizer**) gives linearly polarized light of half the incident intensity ($I_0/2$). Passing this linearly polarized beam through an **analyser** whose transmission axis makes an angle $\theta$ with the former, only the component parallel to the analyser axis is transmitted. If the incident linearly polarized intensity is $I_0$, the transmitted intensity is

$$I = I_0\cos^2\theta$$

This is **Malus's law** (1809). At $\theta=0$ it is brightest, at $\theta=90^{\circ}$ completely dark—rotating the analyser and seeing the intensity cycle through maxima and minima is the standard way to test whether light is polarized. If the incident light is natural, rotating the analyser leaves the intensity unchanged (always $I/2$), which distinguishes natural from linearly polarized light; partially polarized light shows a variation on rotation but never goes completely dark, from which the degree of polarization can be measured.

## IV. Polarization in Reflection and Refraction: The Brewster Angle

When natural light reflects at a dielectric interface, the reflected and refracted beams generally become partially polarized. In particular, when the angle of incidence satisfies

$$\tan\theta_B = \frac{n_2}{n_1}$$

the reflected light becomes **completely linearly polarized**, with its electric vector perpendicular to the plane of incidence (parallel to the interface), while the refracted light is partially polarized. This angle is the **Brewster angle**. At this angle the reflected and refracted rays are mutually perpendicular (verifiable from the law of refraction: $\theta_B+\theta_t=90^{\circ}$, since combining $\tan\theta_B=n_2/n_1$ with $n_1\sin\theta_B=n_2\sin\theta_t$ gives $\theta_B+\theta_t=\pi/2$).

The Brewster angle has wide applications: Brewster windows in lasers let p-polarized light pass losslessly while suppressing s-polarization, thus outputting linearly polarized laser light; photographers put a polarizing filter on the lens to remove reflections from water and glass, exploiting the fact that "reflections near the Brewster angle are highly polarized"; modern polarizing beam-splitter prisms (such as the Wollaston prism) are based on birefringence rather than an interface, but the idea is the same.

## V. Birefringence and Wave Plates

In certain crystals (such as calcite and quartz), an incident beam splits into two refracted beams—**birefringence**. The **o-ray** (ordinary ray) obeys the usual law of refraction, with index $n_o$ independent of direction; the **e-ray** (extraordinary ray) does not obey the ordinary law, its index $n_e$ varying with propagation direction, and the polarization directions of the o- and e-rays are mutually perpendicular. Birefringence arises from the anisotropy of the crystal's dielectric properties: "viewed" along different directions, light has different effective speeds.

Birefringence allows **wave plates**: inside the crystal, o- and e-rays acquire a controllable phase retardation $\Delta\phi=2\pi(n_e-n_o)d/\lambda$. A **quarter-wave plate** ($\Delta\phi=\pi/2$) converts linearly polarized light into circularly polarized light (when the incident linear polarization is at $45^{\circ}$ to the fast and slow axes), or conversely restores circular to linear; a **half-wave plate** ($\Delta\phi=\pi$) rotates the plane of linear polarization by $2\theta$. Wave plates are core elements of liquid-crystal displays (controlling pixel brightness), optical communication modulators and ellipsometers.

## VI. Typical Calculations and Applications

**Example 1: Malus's law.** See problem optics-p5: natural light $I_0$ becomes $I_0/2$ linearly polarized after the polarizer, then passes an analyser at $60^{\circ}$, giving $I_0/2\times\cos^2 60^{\circ}=I_0/8$. If a $\lambda/4$ plate is inserted between the two polarizers, one must first decompose and then recombine, and the result depends on the angle of the fast axis of the plate.

**Example 2: Brewster angle.** From air to glass with $n=1.5$: $\theta_B=\arctan 1.5\approx56.3^{\circ}$. The reflected light is then completely linearly polarized (perpendicular to the plane of incidence), and the refracted light is partially polarized, with a degree of polarization that is imperfect but quite pronounced.

**Example 3: the saccharimeter.** Some solutions (such as sucrose) rotate the plane of polarization (optical activity), and the rotation angle is proportional to concentration and tube length; this allows non-destructive measurement of sugar concentration, widely used in the food and pharmaceutical industries.

## VII. Concept Map and Common Exam Questions

The polarization chapter revolves around "transverse wave → polarization state → manipulation": decomposition of natural light, polarization and analysis (Malus), interfacial polarization (Brewster), crystalline birefringence (wave plates). Common questions: the first applies Malus' law to find the transmitted intensity; the second computes the Brewster angle and judges the reflected polarization; the third treats natural light passing through several polarizers; the fourth concerns the polarization and propagation of o/e rays in birefringence; the fifth uses a wave plate to turn linear into circular/elliptical polarization; the sixth concerns the definition of the degree of polarization. Common errors: recording the intensity after a polarizer as unchanged (it should be halved), writing $\cos^2\theta$ as $\cos\theta$, confusing the reflected and refracted polarization states at the Brewster angle, and assuming that when the reflected light is fully polarized so is the refracted light.

## VIII. Distinctions and Further Thoughts

**Distinction 1: natural light is not "unpolarized" but "averaged over all directions".** It contains all directions, but they are mutually incoherent, so it cannot be treated as a single linear polarization, which is why the intensity through an analyser is always half. **Distinction 2: at the Brewster angle the refracted light is not fully polarized.** Only the reflected light is completely linearly polarized; the refracted light remains partially polarized (unless multiple reflections accumulate, as in a Brewster window). **Distinction 3: Malus' law applies only to linearly polarized incidence.** Natural light through an analyser always gives half the intensity, independent of angle; elliptical or circular incidence must first be projected. Further thought: a complete description of polarization states requires Jones vectors or Stokes parameters, which form the theoretical framework of modern polarization optics and ellipsometry; at the quantum level, the photon itself carries a polarization degree of freedom (horizontal/vertical being two eigenstates), an important coding dimension for quantum communication and quantum computing. From polarizing sunglasses to quantum key distribution, polarization runs across a vast territory from daily life to the frontier, confirming once again that the "directionality" of light as a transverse wave is itself a rich mine.

## IX. Supplement: Scattering Polarization, Optical Activity and Liquid-Crystal Displays

Polarization appears not only at interfaces and in crystals but also in everyday scattering. **Rayleigh scattering** makes the sky blue: the short-wavelength blue-violet part of sunlight is scattered more strongly by air molecules, and the scattered light is strongly polarized—looking up at $90^{\circ}$ from the sun, the scattered light is almost linearly polarized, which is exactly why polarizing sunglasses can filter out "sky glare". The red of sunrise and sunset comes from the long path, after which the blue is almost entirely scattered away and only red reaches us directly.

Some substances rotate the plane of vibration of linearly polarized light—**optical activity**. Sugar solutions and quartz crystals both show it, and the rotation angle $\varphi=[\alpha]lc$ is proportional to the concentration $c$ and the tube length $l$, so a **polarimeter** can measure sugar concentration non-destructively, widely used in the sugar and pharmaceutical industries. Optical activity comes in left- and right-handed forms, a macroscopic manifestation of molecular chirality, crucial in pharmacology (the two enantiomers may have completely different efficacy).

**Stress birefringence (photoelasticity)**: a transparent amorphous material (glass, plastics) under stress temporarily becomes birefringent because of the anisotropic stress and shows coloured fringes in polarized light. Engineers therefore make models of mechanical parts, load them and observe the stress distribution—an important method of structural strength analysis, more intuitive than purely numerical simulation.

**How a liquid-crystal display (LCD) works**: the long axes of liquid-crystal molecules turn with an applied electric field, changing their effective birefringence and their "ability to rotate" polarization. A liquid-crystal layer between two crossed polarizers rotates the plane by $90^{\circ}$ with no voltage, so light passes; with a voltage the molecules lie flat, no longer rotate, and the light is blocked by the second polarizer—so each pixel is "bright" or "dark". Backlight passing through colour filters gives RGB, combining into a colour image. The whole principle is "control birefringence with voltage, read it out with polarizers", turning the polarization and birefringence of this chapter directly into every pixel on your phone screen.

**Jones and Mueller calculus**: to treat several polarization devices in series rigorously, one uses Jones matrices (coherent, fully polarized) or Stokes–Mueller matrices (including partial polarization and depolarization); modern polarization optics and ellipsometric thickness gauges are built on this linear-algebraic framework.`,
  },

  coherence: {
    chapter: 'Chapter 6 Coherence of Light',
    title: 'Temporal and Spatial Coherence',
    summary:
      'Real sources are not ideal monochromatic point sources: their finite spectral width and finite size limit temporal and spatial coherence respectively, determining the maximum optical path difference and the spatial range over which stable interference can occur.',
    keyPoints: [
      'Temporal coherence comes from finite spectral width: coherence time $\\tau_c\\approx1/\\Delta\\nu$, coherence length $L_c=c\\tau_c$',
      'Coherence length approximately $L_c\\approx\\lambda^2/\\Delta\\lambda$',
      'Spatial coherence comes from the finite size of the source: the wider the source, the smaller the separation at which interference survives',
      'The van Cittert–Zernike theorem links the spatial coherence of an extended source to its far-field intensity distribution',
      'Lasers, with their monochromaticity and directionality, far outperform ordinary sources in both temporal and spatial coherence',
      'Coherence determines how fringe visibility decays with path difference and spatial separation',
    ],
    relatedProblemIds: ['optics-p6'],
    content: String.raw`

When discussing interference earlier we stressed that "one must split two beams from the same source". But there is a deeper question: even with a single sodium lamp, if its light is split into two paths and the path difference is made very large, the fringes disappear. This shows that "coherence" is not a black-and-white property but is limited by the imperfections of the source itself. There are two core imperfections: light is not absolutely monochromatic (it has a spectral width), and the source is not an infinitesimal point (it has a size). The former corresponds to **temporal coherence**, the latter to **spatial coherence**. Only by understanding both does one truly know "when interference can be seen and over what range", and why double-slit interference is so hard in sunlight yet easy with a laser.

An analogy: temporal coherence asks "how long can one beam be delayed and still match itself", like two trains travelling in the same direction staying in formation after being offset; spatial coherence asks "how far apart in space can two points still match", like a row of soldiers stepping in sync. They measure two different dimensions of coherence, and both are needed.

## II. Temporal Coherence: From Finite Spectral Width

Ideal monochromatic light has a single frequency and an infinitely long wave train, so interference occurs at any path difference. Real light consists of a train of finite wave trains whose spectrum has a certain width $\Delta\nu$ (corresponding to a wavelength width $\Delta\lambda$). When the path difference exceeds the length of one wave train, the wave train in one beam has already arrived while its "partner" in the other has not, so they cannot overlap and interfere, and the fringe contrast drops to zero.

Define the **coherence time** $\tau_c$ as the duration of a wave train, and the **coherence length**

$$L_c = c\,\tau_c \approx \frac{\lambda^2}{\Delta\lambda},\qquad \tau_c \approx \frac{1}{\Delta\nu}$$

The narrower the spectral width (the better the monochromaticity), the longer the coherence length. An ordinary sodium lamp has a coherence length of millimetres to centimetres, white light only micrometres, while a frequency-stabilized laser can reach kilometres or more. In a Michelson interferometer the path difference of the two arms must be less than $L_c$ for fringes to appear—exactly the situation discussed in problem optics-p6. Temporal coherence essentially reflects "how long the wave train is", translating the monochromaticity of the source into the experimental criterion "the maximum path difference at which interference occurs".

## III. Spatial Coherence: From the Finite Size of the Source

Even if the light is sufficiently monochromatic, if the source has a certain width, the wavelets emitted from different points of the source are mutually incoherent. Consider an extended source of width $b$ illuminating two pinholes separated by $d$: the upper and lower parts of the source introduce a varying phase difference at the pinholes, so that the interference patterns from different source points are shifted relative to each other and smear each other out. Only when the separation $d$ is smaller than some critical value (inversely proportional to the source's angular width $\theta_s\approx b/L$) is the light at the two pinholes sufficiently coherent.

The classic criterion (the transverse coherence width) is approximately

$$d_c \sim \frac{\lambda}{\theta_s}$$

For example, a distant star looks like a "point" with an extremely small angular diameter, so light received at two widely separated points on the ground is still coherent—this is the principle of the **intensity interferometer** (Hanbury Brown–Twiss method) for measuring stellar angular diameters: find the baseline at which interference disappears and infer the angular size. The van Cittert–Zernike theorem gives the rigorous relation: the spatial coherence function of an extended source is proportional to the normalized Fourier transform of its intensity distribution, directly linking "what the source looks like" to "where in the distance coherence survives".

## IV. Physical Picture of the Two Coherences and Their Relation

One may think of coherence as "whether two beams can match in space and time". **Temporal coherence** answers "along the same path, how long a delay still matches"—limited by spectral width; **spatial coherence** answers "how far apart in space still matches"—limited by source size. They are independent yet complementary: a laser is both narrow-band (long temporal coherence) and highly directional (large spatial coherence range), so it is easiest for long-distance, large-aperture interference; a thermal source such as the sun has a broad spectrum and a large angular size, so it is poorly coherent, and interference requires a filter (to narrow the spectrum) and limiting the effective source size (e.g. with a pinhole).

It is worth noting that diffraction and spatial coherence are mirror images: a point source diffracted through a circular aperture produces a patch of coherent illumination, while an extended source "washes away" coherence. The reason the gratings and single slits of Chapter 4 need laser or distant point-source illumination is precisely to preserve spatial coherence—otherwise the fringes are smeared by the source itself.

## V. Typical Calculations and Measurements

**Example 1: coherence length.** See problem optics-p6: a source with central wavelength $\lambda_0=600\ \text{nm}$ and $\Delta\lambda=0.06\ \text{nm}$ has coherence length $L_c=\lambda_0^2/\Delta\lambda=6.0\ \text{mm}$ and coherence time $\tau_c=L_c/c=20\ \text{ps}$; beyond a path difference of about $6\ \text{mm}$ no interference is visible.

**Example 2: spatial coherence width.** The sun's angular diameter is about $0.0093\ \text{rad}$, so the coherence width on the ground is $d_c\sim\lambda/\theta_s\sim550\ \text{nm}/0.0093\approx60\ \mu\text{m}$—which explains why double-slit interference with direct sunlight is difficult and why a pinhole is needed first to "create a coherent point source".

**Example 3: white-light interference.** White light has a very large $\Delta\lambda$ and a coherence length of only about a wavelength, so only a few coloured fringes appear near zero path difference; this is exactly the advantage of white-light interference for precision positioning (such as interference microscopes measuring surface topography): the zero-order white fringe is extremely precisely located.

## VI. Concept Map and Common Exam Questions

The coherence chapter is organized around "the two kinds of non-ideality of real sources": spectral width → temporal coherence ($L_c\sim\lambda^2/\Delta\lambda$), size → spatial coherence (width $\sim\lambda/\theta_s$). Common questions: the first computes coherence length/time from spectral width; the second judges whether interference occurs at a given path difference; the third finds the spatial coherence range from the angular width of the source; the fourth relates to Michelson and stellar interferometers; the fifth compares lasers with ordinary sources; the sixth concerns the definition and decay of contrast. Common errors: confusing temporal with spatial coherence, inverting $\lambda^2/\Delta\lambda$ into $\Delta\lambda/\lambda^2$, ignoring the decay of contrast with path difference, and mistaking "coherence length" for a geometric distance travelled.

## VII. Distinctions

**Distinction 1: coherence length is not a geometric length.** It is "the maximum optical path difference at which interference still occurs", physically corresponding to the wave-train length, not the distance light actually travels. **Distinction 2: temporal coherence ≠ spatial coherence.** The former governs delay, the latter separation; lasers are strong in both but for different reasons—one from narrow bandwidth, the other from small divergence. **Distinction 3: fringes disappearing = no light?** No: the total intensity is unchanged, the interference term simply averages to zero and the pattern becomes uniformly bright; the energy has not vanished, it is just no longer redistributed.

## VIII. Further Thoughts

Coherence is the bridge between "the nature of the source" and "the visibility of interference", and also the fundamental limit and support of modern interferometric precision. The gravitational-wave detector LIGO uses kilometre-scale arms and frequency-stabilized lasers (extremely long coherence) to read arm-length changes of one part in $10^{13}$; astronomical optical interferometric arrays combine several telescopes into an equivalent large aperture, relying on the precise use of spatial coherence. Conversely, low-coherence sources (such as the broad-spectrum light used in OCT medical imaging) have extremely short coherence lengths and can therefore perform micrometre-scale tomography—"bad coherence" cleverly turned into an advantage. One may say that by understanding the boundaries of coherence you hold the whole scale code of optical measurement, and you have made the final preparation for Chapter 7's "why a laser is a perfect coherent source".

## IX. Supplement: Order-of-Magnitude Estimates and Typical Applications

Turning abstract concepts into concrete numbers makes coherence more tangible. An ordinary sodium lamp has a line width of about $\Delta\lambda\sim0.6\ \text{nm}$ (centre $589\ \text{nm}$), giving $L_c\sim\lambda^2/\Delta\lambda\sim0.6\ \text{mm}$; a low-pressure cadmium lamp can reach centimetres for interferometry; a light-emitting diode (LED) has a spectral width of tens of nanometres and a coherence length of only a few micrometres, so LEDs are unsuitable for long-range interference but good for uniform illumination; a frequency-stabilized He–Ne laser can have a coherence length of hundreds of metres or even kilometres, enabling extremely long baseline interferometry. White light has a coherence length of almost one wavelength, so white-light interference appears only near zero path difference—precisely why low-coherence tomography (OCT) "images only at zero path difference" and thereby achieves high axial resolution: it is like an "optical ultrasound" using broadband light as its ruler, able to look non-destructively through the layers of the retina and vessel walls.

**Temporal coherence and multi-beam interference**: from the temporal-coherence viewpoint, each fringe in a Michelson interferometer corresponds to a path difference that is an integer fraction of the coherence length; when the arm difference exceeds $L_c$, the fringes of different wavelengths shift relative to each other and the contrast vanishes. Hence "zeroing" (reading near $\Delta L=0$) is standard practice for precision interferometers.

**A quantitative example of spatial coherence**: the sun's angular diameter is about $0.0093\ \text{rad}$, and the spatial coherence width on the ground is only about $60\ \mu\text{m}$—which is why double-slit interference with direct sunlight is almost invisible, and a pinhole must first "carve out" an approximately pointlike source. Conversely, a distant star may have an angular diameter as small as milliarcseconds, giving a spatial coherence range of tens of metres, so starlight received by widely separated telescopes on the ground can still interfere. This gave rise to the **intensity interferometer** (Hanbury Brown and Twiss, 1956): instead of comparing phases it correlates intensity fluctuations to infer the stellar angular diameter, and it became a precursor of photon bunching/antibunching measurements in quantum optics.

**A unified picture of coherence**: temporal coherence comes from spectral width, spatial coherence from source size, and the two are unified in the mutual coherence function $\Gamma(\tau,\Delta r)$; the van Cittert–Zernike theorem is its spatial special case. Modern quantum optics goes further, using the "second-order coherence function $g^{(2)}(\tau)$" to distinguish thermal light (photon bunching) from laser light (photon antibunching), elevating the classical coherence concepts of this chapter to the level of photon statistics. One may say that coherence is both the boundary of classical wave optics and the gateway to quantum optics.

## X. Fringe Contrast: Turning "Visible" into a Number

The preceding text repeatedly says fringes "blur" or "disappear", but blurring is ultimately a feeling. Experiments and engineering must speak in numbers, and that number is the **fringe visibility** (or contrast)

$$V = \frac{I_{\max} - I_{\min}}{I_{\max} + I_{\min}},\qquad 0 \le V \le 1$$

$V=1$ is the ideal case (dark fringes completely black), $V=0$ means the screen is completely uniform and the fringes have vanished. Substituting the two-beam intensity $I = I_1+I_2+2\sqrt{I_1I_2}\cos\delta$, with $\cos\delta=\pm1$ giving $I_{\max,\min}=I_1+I_2\pm2\sqrt{I_1I_2}$, yields

$$V = \frac{2\sqrt{I_1 I_2}}{I_1 + I_2}$$

So the closer the two intensities, the higher the contrast; if one beam is far stronger than the other, $V\to 0$ and the fringes become hard to discern. This is why holographic recording must choose a suitable beam ratio, and why an interferometer must add attenuation to compensate a weak signal arm.

More generally, introduce the **mutual coherence function** $\Gamma_{12}(\tau) = \langle E_1(t+\tau)E_2^{\,*}(t)\rangle$ and the normalized complex degree of coherence

$$\gamma_{12}(\tau) = \frac{\Gamma_{12}(\tau)}{\sqrt{I_1 I_2}},\qquad 0\le |\gamma_{12}| \le 1$$

The interference intensity of any two beams can then be written uniformly as

$$I = I_1 + I_2 + 2\sqrt{I_1 I_2}\,|\gamma_{12}(\tau)|\cos\delta,\qquad V = \frac{2\sqrt{I_1 I_2}}{I_1+I_2}\,|\gamma_{12}|$$

Thus temporal and spatial coherence acquire a common language: the former is the decay of $|\gamma|$ with delay time $\tau$ (equivalently path difference $\Delta L = c\tau$), the latter the decay of $|\gamma|$ with transverse separation of two points. Coherence time, coherence length and spatial coherence width are all merely the characteristic scales at which $|\gamma|$ falls to some agreed threshold.

**Specific line shapes**: a Lorentzian line (dominated by natural broadening, full width at half maximum $\Delta\nu$) gives $|\gamma(\tau)| = e^{-\pi\Delta\nu|\tau|}$; a Gaussian line (dominated by Doppler broadening) gives $|\gamma(\tau)| = \exp\left[-\dfrac{\pi^2(\Delta\nu\,\tau)^2}{4\ln 2}\right]$. The two decay at different rates, but both characteristic times satisfy $\tau_c \sim 1/\Delta\nu$—the quantitative expression of "the narrower the spectrum, the longer the coherence", and the resting point of all the formulas in this section.

## XI. A Comprehensive Worked Example

**Example: joint estimate of contrast, coherence length and usable path difference of an interferometer.**

A Michelson interferometer is illuminated by a green LED with central wavelength $\lambda_0 = 550\ \text{nm}$ and spectral width $\Delta\lambda = 5.5\ \text{nm}$; after splitting, the intensity ratio of the two arms is $I_1:I_2 = 4:1$. (1) Find the coherence length $L_c$ and coherence time $\tau_c$ of the source. (2) Find the maximum fringe contrast $V_0$ achievable when the two beams are fully coherent. (3) Assuming a Lorentzian line shape, at what path difference does the contrast fall to $V_0/2$?

**Step 1: coherence length and coherence time.** From $L_c\approx \lambda_0^2/\Delta\lambda$:

$$L_c \approx \frac{(5.50\times10^{-7}\ \text{m})^2}{5.5\times10^{-9}\ \text{m}} = \frac{3.025\times10^{-13}}{5.5\times10^{-9}}\ \text{m} = 5.5\times10^{-5}\ \text{m} = 55\ \mu\text{m}$$

$$\tau_c = \frac{L_c}{c} = \frac{5.5\times10^{-5}\ \text{m}}{3.0\times10^{8}\ \text{m/s}} \approx 1.8\times10^{-13}\ \text{s} = 0.18\ \text{ps}$$

A coherence length of only tens of micrometres means the Michelson arms must be matched within tens of micrometres to see fringes, quantitatively confirming the intuition that "broadband sources are hard to use for interference".

**Step 2: contrast loss from intensity mismatch.** Take $I_1 = 4I$, $I_2 = I$; at $|\gamma|=1$,

$$V_0 = \frac{2\sqrt{I_1 I_2}}{I_1 + I_2} = \frac{2\sqrt{4I\cdot I}}{4I + I} = \frac{4I}{5I} = 0.80$$

Even with a perfectly coherent source, the imperfect beam ratio alone lowers the contrast from the ideal $1.00$ to $0.80$. Equalizing the two arm intensities is therefore always the first step in improving fringe quality.

**Step 3: decay of contrast with path difference.** First convert the wavelength spread into a frequency spread (note $\Delta\lambda\ll\lambda_0$):

$$\Delta\nu = \frac{c\,\Delta\lambda}{\lambda_0^2} = \frac{3.0\times10^{8}\times 5.5\times10^{-9}}{(5.50\times10^{-7})^2} \approx 5.45\times10^{12}\ \text{Hz}$$

For a Lorentzian line, $V(\Delta L) = V_0\,e^{-\pi\,\Delta\nu\,\Delta L/c}$; setting $V = V_0/2$,

$$\frac{\pi\,\Delta\nu\,\Delta L_{1/2}}{c} = \ln 2 \quad\Longrightarrow\quad \Delta L_{1/2} = \frac{c\,\ln 2}{\pi\,\Delta\nu}$$

$$\Delta L_{1/2} = \frac{3.0\times10^{8}\times 0.693}{3.1416\times 5.45\times10^{12}}\ \text{m} \approx 1.21\times10^{-5}\ \text{m} = 12.1\ \mu\text{m}$$

**Check**: from the defining relations, $\Delta L_{1/2}/L_c = \ln 2/\pi \approx 0.221$, and $12.1/55 \approx 0.22$; the two agree, so the calculation is self-consistent. **Physical meaning**: the usable range of this interferometer is only about $12\ \mu\text{m}$ (half contrast) to $55\ \mu\text{m}$ (characteristic limit), far below that of a laser; with a frequency-stabilized laser of $\Delta\lambda = 0.0055\ \text{nm}$, $L_c$ grows a thousandfold to over $5.5\ \text{cm}$—exactly why precision interferometry must use lasers.

## XII. Advanced Pitfall Checklist and Self-Test

- **Treating $L_c$ as a hard boundary**: the coherence length is a characteristic scale, not a threshold. Beyond $L_c$ the fringes gradually blur, the contrast decaying continuously according to the exponential law above; there is no "suddenly all black" critical point.
- **Omitting the spectral conversion**: $\Delta\nu = c\,\Delta\lambda/\lambda_0^2$ holds only when $\Delta\lambda\ll\lambda_0$; substituting $\Delta\lambda$ directly into a formula involving frequency inevitably fails—always convert to the frequency domain first.
- **Confusing contrast with total intensity**: $V$ describes contrast, not brightness. A neutral-density filter attenuating both beams leaves $V$ almost unchanged; dimming only one beam degrades $V$ markedly.
- **Misattributing causes**: in a Michelson interferometer, "increasing the arm difference makes the fringes disappear" is a temporal-coherence problem; "replacing the source with a wider, larger one makes them disappear" is a spatial-coherence problem. The causes differ, and so do the remedies (a narrow-band source for the former, a pinhole or a laser for the latter).
- **Assuming two independent lasers are naturally coherent**: two lasers of the same model may have the same central wavelength, but their phases drift randomly and there is no stable phase relation even over short times; interference requires phase locking or splitting two paths from one beam.
- **Ignoring the two corrections of the source**: if $\Delta\lambda$ is taken as the full width at half maximum of the line, the order of magnitude of the coherence length is correct but the coefficient depends on the line shape; in problems, use the convention given in the question.

**Self-test**: why can LIGO, with arms four kilometres long, still obtain clear fringes? (Answer: it does not use a broadband source but a laser with extremely narrow linewidth and stable frequency, whose coherence length far exceeds the arm length; high vacuum and high-reflectivity cavity mirrors keep the phase noise controlled.) Being able to answer this shows that you have carried the main line "coherence determines the observable scale" from the textbook to the most precise measuring device of our time.`,
  },

  'modern-optics': {
    chapter: 'Chapter 7 Introduction to Modern Optics',
    title: 'Lasers and Holography',
    summary:
      'Lasers produce highly monochromatic, strongly directional coherent light through stimulated emission and cavity mode selection; holography records both the amplitude and the phase of an object wave by interference, and reconstructs a three-dimensional image.',
    keyPoints: [
      'Stimulated emission: an incident photon induces an excited atom to emit a photon of the same frequency, phase and direction—the basis of laser amplification',
      'Population inversion is the prerequisite for optical gain and must be maintained by pumping',
      'The cavity (two mirrors) provides feedback and longitudinal-mode selection, with mode spacing $\\Delta\\nu=c/(2L)$',
      'A hologram records the interference of object and reference beams, storing amplitude and phase together',
      'Reconstruction illuminates the hologram with a conjugate beam; diffraction rebuilds the original wavefront and gives a true three-dimensional image',
      'The strong coherence of lasers (long coherence length plus large spatial coherence) pushes the principles of the first six chapters to their technical peak',
    ],
    relatedProblemIds: ['optics-p4', 'optics-p6'],
    content: String.raw`

In all our earlier interference and diffraction experiments, the most troublesome thing was that the source was not "well behaved": broad lines, divergent directions, random phases. The laser (Light Amplification by Stimulated Emission of Radiation), born in 1960, solved all three at once—extremely monochromatic, extremely collimated, extremely coherent, almost a physical realization of the textbook "ideal source". Interference fringes that once required careful arrangement now fill the screen at a stroke of laser light; precision measurement, long-distance communication and three-dimensional imaging, once impossible, have become everyday. As the closing chapter of the course, this one introduces lasers and holography, the two jewels of modern optics, showing how they push the principles of the first six chapters to their technical peak, and just what makes an "ideal source" ideal.

Recall that Chapter 6 said an ordinary source has a coherence length of only millimetres and a spatial coherence range of only micrometres, whereas a small He–Ne laser can have a coherence length of a hundred metres and spatial coherence across the whole beam cross-section. It is this overwhelming coherence advantage that makes the laser a universal tool, from supermarket barcode scanning, fibre communication and laser cutting to gravitational-wave detection and cold-atom physics. To understand the laser is essentially to understand "how to create and maintain extremely good coherence artificially".

## II. Stimulated Emission and Population Inversion

Atoms have discrete energy levels. An atom in the upper level $E_2$ can spontaneously decay to the lower level $E_1$, emitting a photon (spontaneous emission, with random phase and direction); but if an external photon of frequency $\nu=(E_2-E_1)/h$ passes by, it induces the atom to emit **another photon of the same frequency, phase, propagation direction and polarization**—this is **stimulated emission**. One photon in, two identical photons out: the light is "copied" and amplified. This is the origin of coherent light amplification, a process Einstein predicted as early as 1917 but which had to wait until 1960 for realization.

The problem is that in thermal equilibrium the lower level is more populated than the upper (Boltzmann distribution), so light is absorbed more than amplified. For net gain one must create a **population inversion** (more atoms in the upper than the lower level), achieved by continuous external **pumping** (electrical discharge, optical pumping, chemical energy, etc.) that moves atoms up. When the gain exceeds the cavity losses, laser oscillation sets up. Note that the inversion concerns only "the pair of levels that produces the laser light"; the system as a whole still receives energy from the pump and does not violate thermodynamics.

## III. The Cavity and Mode Selection

A gain medium alone is not enough: an **optical cavity** (usually two facing mirrors, one fully reflecting and one partially transmitting for output) makes the light bounce back and forth through the medium, amplified on each pass, while only light along the cavity axis can exist stably and other directions escape—this gives the laser its excellent directionality.

The cavity length $L$ imposes a condition on axial standing waves: the round-trip phase difference is $2kL=2\pi q$, i.e.

$$\nu_q = q\,\frac{c}{2L}$$

and the frequency spacing of adjacent longitudinal modes is $\Delta\nu=c/(2L)$. The number of longitudinal modes within the gain curve determines the monochromaticity; shortening the cavity or adding an etalon (Fabry–Pérot) selects a single longitudinal mode and gives an extremely narrow linewidth. Combined with the coherence analysis of Chapter 6: good monochromaticity ⇒ extremely long coherence length (strong temporal coherence); strong directionality ⇒ large spatial coherence range (small divergence). This is why the laser is a "perfect coherent source", and why it can easily perform long-distance interference and sharp far-field diffraction.

## IV. Holography: Recording All the Information of Light

Ordinary photography records only the **intensity** (squared amplitude) of the object wave and loses the **phase**, so it gives only a flat two-dimensional image. The trick of holography (Gabor, 1948, Nobel Prize 1971) is to let the object wave interfere with a reference beam and record the interference fringes (a dense bright-dark grating) on a plate. This pattern encodes both the amplitude and the phase of the object wave—because the phase difference $\delta$ in the interference term $2\sqrt{I_o I_r}\cos\delta$ comes precisely from the delay of the object wavefront relative to the reference.

In **reconstruction**, the hologram is illuminated with a conjugate beam similar to the reference. The hologram acts as a complex grating and, after diffraction, rebuilds the original object wavefront; the eye then sees a three-dimensional virtual image with parallax, around which one can move to see depth, even "seeing" occluded background objects. If a hologram is broken into pieces, each piece can still reconstruct a complete but slightly blurred image—information is stored distributively, a robustness ordinary photographs lack. Holography is essentially the combination of interference (Chapter 3) and diffraction (Chapter 4): recording by interference, reconstruction by diffraction, perfectly closing the wave thread of this course.

## V. Typical Connections and Calculations

**Example 1: longitudinal mode spacing.** A He–Ne laser with cavity length $L=30\ \text{cm}$ has $\Delta\nu=c/(2L)=3\times10^8/(0.6)=5\times10^8\ \text{Hz}=500\ \text{MHz}$, far smaller than its gain linewidth, so it may oscillate in several longitudinal modes; single-mode operation needs further selection (short cavity or an etalon).

**Example 2: coherence length and holography.** Holography requires the path difference between reference and object beams to be less than the coherence length of the source (cf. optics-p6); with an ordinary source, holography demands an extremely narrow band and strict path matching, whereas a laser with $L_c$ of metres made holography practical—exactly why holography flourished only after the laser appeared.

**Example 3: a grating is a hologram.** A hologram is essentially a complex grating written by interference, and its diffraction reconstruction is the grating equation of Chapter 4 in action—modern computer-generated holograms (CGH) design the diffractive structure directly, producing special illumination and optical elements (DOEs).

## VI. Concept Map and Common Exam Questions

The modern optics chapter gathers the first six: stimulated emission (coherent amplification) plus the cavity (mode selection, directionality) ⇒ lasers; the strong coherence of lasers ⇒ holography (recording phase by interference) plus precision measurement. Common questions: the first distinguishes stimulated from spontaneous emission; the second concerns population inversion and pumping; the third treats cavity longitudinal modes and spacing; the fourth asks why a hologram records phase and why it is three-dimensional; the fifth relates laser properties to coherence (linking to Chapter 6); the sixth asks whether recording and reconstruction correspond to interference or diffraction. Common errors: thinking the stimulated photon is unrelated to the incident one (it is identical), confusing the longitudinal-mode spacing formula, treating a hologram as an ordinary photograph recording only intensity, and assuming a holographic image is not truly three-dimensional.

## VII. Distinctions

**Distinction 1: stimulated emission does not "create light out of nothing".** It needs an incident photon to trigger it, and the output photon is identical to the input—a coherent copy—so energy is conserved (the pump has supplied it). **Distinction 2: good directionality ≠ automatic single mode.** Directionality is set by the cavity geometry, monochromaticity by longitudinal-mode selection; the means differ and must be designed separately. **Distinction 3: the three-dimensionality of a holographic image is real.** Because the phase is recorded, parallax and depth are physically present, not a visual illusion; moving your head reveals different sides.

## VIII. Further Thoughts

From stimulated emission to cavity mode selection, and on to holography sealing phase in interference—every main thread of modern optics has its root in the first six chapters: the coherence conditions of Chapter 2, the interference recording of Chapter 3, the grating diffraction of Chapter 4, the coherence length of Chapter 6 all converge here into technology. Today lasers and holography have spawned fibre communications, optical disk storage, 3D displays, optical tweezers, cold-atom manipulation, quantum information and many other directions; and the idea of "measuring everything with light interference" is being pushed to ultimate precision by gravitational-wave detection and optical frequency combs. The textbook ends here, but the journey of optics as the foundation of modern technology has only begun—may you carry the simplicity of Fermat's principle, the depth of Huygens' superposition, and the elegance of coherence and polarization, and keep exploring the farther reaches of light and information, light and matter.

## IX. Supplement: Common Lasers and the Mathematical Outline of Holography

**Common laser devices**: the He–Ne laser outputs $632.8\ \text{nm}$ red light with excellent coherence and narrow linewidth, a mainstay of teaching and metrology; semiconductor (diode) lasers are small and efficient, used in phone scanners, fibre communications and laser pointers, their cavity being the cleaved facets at the two ends of the chip; the Nd:YAG solid-state laser at $1064\ \text{nm}$ frequency-doubled to $532\ \text{nm}$ green is used for cutting and medicine; the Ti:sapphire femtosecond laser delivers pulses of only tens of femtoseconds for ultrafast spectroscopy and strong-field physics. All satisfy the chain "pump → population inversion → cavity mode selection → stimulated amplification".

**The four characteristics of laser light**: monochromaticity (extremely narrow linewidth), directionality (extremely small divergence), coherence (strong in both time and space) and high brightness (energy concentrated in a very narrow frequency band and a very fine beam). The four support one another, making the laser the physical embodiment of all the ideal conditions of the first six chapters.

**The mathematical outline of holographic recording**: let the object wavefront be $O(x,y)$ and the reference beam $R(x,y)$; the intensity distribution on the plate is

$$I = |O+R|^2 = |O|^2 + |R|^2 + O R^* + O^* R$$

The last two terms $O R^*$ and $O^* R$ are precisely the holographic "gratings" carrying the amplitude and phase of the object wave. On reconstruction, illumination with a beam conjugate to $R$ makes the diffracted term $O R^* R_{\text{recon}}$ rebuild $O$ directly, i.e. the original object wavefront. So the ability of holography to store phase comes from letting the object and reference beams "beat" and encode phase into intensity—a joint exercise of the interference of Chapter 3 and the diffraction of Chapter 4.

**Computer-generated holography (CGH)**: an algorithm computes the interference pattern to be recorded and writes it onto a spatial light modulator (SLM); without any real object, it diffracts a designed three-dimensional or special wavefront, used for 3D displays, beam shaping and lithographic masks. It upgrades "record–reconstruct" to "design–diffract", turning holography from a photographic technique into a programmable light-field engine.

**A closing look back**: from the single extremal creed of Fermat's principle, to Huygens' wavelet picture, Young's fringes, Fresnel's diffraction integral, Malus' law of polarization, the double boundary of coherence, and on to lasers and holography condensing it all into technology—optics is not a heap of scattered formulas but a logical chain strung by "how light propagates, how it superposes, how it is manipulated". Read this chain and you hold the key to understanding every light-based technology of the modern age.`,
  },
};

export default map;
