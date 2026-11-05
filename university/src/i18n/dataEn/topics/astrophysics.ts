import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'celestial-mechanics': {
    chapter: 'Chapter 1 Foundations of Celestial Mechanics',
    title: 'The Two-Body Problem and Kepler\u2019s Laws',
    summary:
      'Newton unified falling bodies on Earth with orbiting planets under one inverse-square law; reduced mass turns the two-body problem into a one-body central-force problem, and the conservation laws then yield Kepler\u2019s three laws plus a universal balance for weighing bodies.',
    keyPoints: [
      'Newtonian gravitation $\\vec{F}_{12} = -Gm_1m_2\\hat{r}/r^2$, with $G = 6.674\\times 10^{-11}\\,\\text{N}\\cdot\\text{m}^2\\cdot\\text{kg}^{-2}$',
      'The two-body problem reduces, with $\\mu = m_1m_2/(m_1+m_2)$, to a one-body problem with gravitational parameter $G(m_1+m_2)$',
      'Conservation of angular momentum gives a constant areal velocity (Kepler II) and confines the orbit to a plane',
      'Orbits are conics $r = p/(1+e\\cos\\theta)$: $E<0$ an ellipse, $E\\ge 0$ a parabola or hyperbola',
      'Newton\u2019s corrected third law $T^2 = 4\\pi^2 a^3/[G(m_1+m_2)]$ is the universal way to weigh astronomical bodies',
      'For an ellipse the total energy depends only on the semi-major axis, $E = -GM\\mu/(2a)$; escape speed $v_{\\text{esc}} = \\sqrt{2GM/R} = \\sqrt{2}\\,v_c$',
    ],
    content: String.raw`

Before Newton people generally believed that heaven and earth obeyed two different sets of laws: bodies fell here below, while planets circled forever along perfect circles above. Newton's breakthrough was not "discovering gravity"—everyone knew things fall—but daring to put both phenomena in the same formula. His reasoning was simple: if the force that makes the apple fall comes from the Earth and weakens with distance, does it reach the Moon? Perhaps the Moon does not fall to the ground only because it moves sideways fast enough to keep missing the Earth while continually falling. That is the famous "Newton's cannon": fire a projectile horizontally from a high mountain and it lands farther the faster it goes; when the speed is large enough the curvature of its fall matches the curvature of the Earth, and it never lands, becoming a satellite. "Falling" and "orbiting" are then the same motion under different initial conditions.

To make this quantitative, two questions had to be answered: how does the force vary with distance, and what shape is the orbit? Newton inferred the inverse-square law from Kepler's third law and proved with his calculus that orbits must be conics, unifying Tycho's twenty years of observations, Kepler's empirical laws and Galileo's terrestrial mechanics into one system—the first great unification in physics. Even today, apart from fine effects such as Mercury's perihelion precession that need general relativity, Newtonian gravity remains the basis of spaceflight, planetary ephemerides and binary-star orbits, accurate enough to send probes to Mars hundreds of millions of kilometres away.

## II. The Law of Gravitation and Reduction of the Two-Body Problem

**Law of universal gravitation**: any two point masses attract along the line joining them,

$$\vec{F}_{12} = -\frac{G m_1 m_2}{r^2}\hat{r},\qquad G = 6.674\times 10^{-11}\ \text{N}\cdot\text{m}^2\cdot\text{kg}^{-2}$$

where $\hat{r}$ is a unit vector and the minus sign means attraction. $G$ is the universal gravitational constant, first measured in the laboratory by Cavendish with a torsion balance, and one of the earliest fundamental constants ever determined.

**Reduction of the two-body problem**: for two bodies interacting only through their mutual gravity,

$$m_1\ddot{\vec r}_1 = -\frac{G m_1 m_2}{|\vec r_1 - \vec r_2|^3}(\vec r_1 - \vec r_2),\qquad m_2\ddot{\vec r}_2 = +\frac{G m_1 m_2}{|\vec r_1 - \vec r_2|^3}(\vec r_1 - \vec r_2)$$

Adding the two equations shows that the centre of mass $\vec R = (m_1\vec r_1 + m_2\vec r_2)/M$ (with $M = m_1 + m_2$) satisfies $\ddot{\vec R} = 0$: it moves uniformly in a straight line, the expression of momentum conservation without external forces. The real content is the relative motion: with $\vec r = \vec r_1 - \vec r_2$, subtracting gives

$$\ddot{\vec r} = -\frac{GM}{r^3}\vec r$$

Introducing the **reduced mass** $\mu = \dfrac{m_1 m_2}{m_1 + m_2}$, this becomes the standard central-force form

$$\mu\ddot{\vec r} = -\frac{G M\mu}{r^2}\hat r$$

So the two-body problem is exactly equivalent to a fictitious particle of mass $\mu$ moving in the field of a fixed centre with gravitational parameter $GM$. This is the most important trick in celestial mechanics: two mutually orbiting bodies reduce to a single orbit problem, and the actual positions follow from $\vec r_1 = \vec R + (m_2/M)\vec r$, $\vec r_2 = \vec R - (m_1/M)\vec r$. When $m_1 \gg m_2$, $\mu \approx m_2$ and $M \approx m_1$—justifying the usual neglect of the planet's pull on the Sun.

## III. Angular Momentum and Kepler's Second Law

A central force exerts no torque about the centre, so

$$\vec L = \mu\,\vec r\times\dot{\vec r},\qquad L = \mu r^2\dot\theta = \text{constant}$$

is conserved. Two consequences follow. First, the direction of $\vec L$ is fixed, so $\vec r$ always lies perpendicular to it: the orbit is strictly planar—the two-body problem is two-dimensional. Second, the area swept per unit time is

$$\frac{dA}{dt} = \frac12 r^2\dot\theta = \frac{L}{2\mu} = \text{constant}$$

which is **Kepler's second law** (the law of areas): the line from Sun to planet sweeps equal areas in equal times. Kepler extracted this empirical rule from Tycho's data; in Newtonian mechanics it is only the geometry of angular momentum conservation. It immediately implies that a planet moves faster at perihelion, where $r$ is small and the areal velocity fixed. Earth moves at about $30.3\ \text{km/s}$ at perihelion (early January) and $29.3\ \text{km/s}$ at aphelion (early July).

## IV. Orbit Shape and Kepler's First Law

Using angular momentum to eliminate time reduces the radial motion to one dimension. The total energy is

$$E = \frac12\mu\dot r^2 + \frac{L^2}{2\mu r^2} - \frac{GM\mu}{r}$$

where the second term is the **centrifugal potential** and the third the gravitational one; together they form the effective potential $U_{\text{eff}}(r)$. Solving the orbit equation gives a conic

$$r = \frac{p}{1 + e\cos\theta},\qquad p = \frac{L^2}{GM\mu^2},\qquad e = \sqrt{1 + \frac{2EL^2}{G^2M^2\mu^3}}$$

The eccentricity is fixed entirely by the energy: $E < 0$ gives $e < 1$ (an ellipse, a bound orbit); $E = 0$ gives $e = 1$ (a parabola); $E > 0$ gives $e > 1$ (a hyperbola, a scattering orbit). This is the full meaning of **Kepler's first law**: planets move on ellipses with the Sun at one focus—a focus, not the centre, matching the asymmetry of $r(\theta)$ above. For an ellipse the semi-major axis is $a = p/(1-e^2)$ and the total energy depends only on it:

$$E = -\frac{GM\mu}{2a}$$

This is extremely useful: the energy of an elliptical orbit is independent of eccentricity and depends only on the semi-major axis. Two orbits with the same $a$ but very different $e$ carry exactly the same energy.

## V. Kepler's Third Law and Weighing Astronomical Bodies

The area of an ellipse is $A = \pi a b$ with $b = a\sqrt{1-e^2}$. With constant areal velocity the period is

$$T = \frac{A}{dA/dt} = \frac{\pi a b}{L/(2\mu)} = \frac{2\pi a^2\sqrt{1-e^2}\,\mu}{L}$$

Using $p = a(1-e^2) = L^2/(GM\mu^2)$, i.e. $L = \mu\sqrt{GMa(1-e^2)}$, and eliminating $L$ and $e$:

$$T = \frac{2\pi a^{3/2}}{\sqrt{GM}}\quad\Longrightarrow\quad T^2 = \frac{4\pi^2}{G(m_1+m_2)}a^3$$

This is **Kepler's third law**, and Newton's key correction: the proportionality constant is not universal but inversely proportional to the sum of the two masses. Kepler's original $T^2 \propto a^3$ holds only when the central body dominates and only when comparing bodies orbiting the same centre; comparing Jupiter's moons with Earth's orbit around the Sun gives a different constant. Conversely, this correction is astronomy's only universal balance: measure the semi-major axis and period and you obtain $m_1 + m_2$. Inserting Earth's orbit, $a = 1\ \text{AU} = 1.496\times 10^{11}\ \text{m}$ and $T = 1\ \text{yr} = 3.156\times 10^{7}\ \text{s}$:

$$M_\odot \approx \frac{4\pi^2 a^3}{GT^2} \approx 1.99\times 10^{30}\ \text{kg}$$

The orbit of Io gives Jupiter's mass as about $1.9\times 10^{27}\ \text{kg}$, and the eccentric orbit of the star S2 around the Galactic Centre gives the central black hole a mass of about $4.3\times 10^6 M_\odot$—from a moon to a supermassive black hole, one formula.

## VI. Orbital Energy and Escape Speed

The circular orbit is the simplest case. Let gravity supply the centripetal force:

$$\frac{\mu v_c^2}{r} = \frac{GM\mu}{r^2}\quad\Longrightarrow\quad v_c = \sqrt{\frac{GM}{r}}$$

Then $K = \tfrac12\mu v_c^2 = GM\mu/(2r)$ and $U = -GM\mu/r$, so $E = -GM\mu/(2r)$, consistent with $E = -GM\mu/(2a)$ for $a = r$. Negative total energy means a bound state; breaking it apart requires energy from outside.

**Escape speed**: the minimum speed from radius $R$ just reaching infinity ($E = 0$) satisfies $\tfrac12\mu v_{\text{esc}}^2 - GM\mu/R = 0$:

$$v_{\text{esc}} = \sqrt{\frac{2GM}{R}} = \sqrt2\,v_c$$

Escape speed is exactly $\sqrt2$ times the circular speed at the same height and is independent of direction (neglecting atmosphere and rotation). At Earth's surface $v_{\text{esc}} \approx 11.2\ \text{km/s}$, on the Moon only about $2.4\ \text{km/s}$—which is why the Moon has no atmosphere—and at the solar surface about $618\ \text{km/s}$. Solving $v_{\text{esc}} = c$ gives the Schwarzschild radius $R_s = 2GM/c^2$ of Chapter 5.

One engineering corollary comes straight from these formulas: speeding up at a point on a circular orbit does not immediately raise the orbit there but raises it on the opposite side, producing an ellipse; a transfer therefore needs two burns (Hohmann transfer), the first into the transfer ellipse and the second to circularize at apoapsis. The fuel required is set by the sum of the two velocity increments, each computable from $v_c = \sqrt{GM/r}$ and $E = -GM\mu/(2a)$.

## VII. Common Pitfalls

**Pitfall 1: treating the constant in Kepler's third law as universal.** After Newton it is $4\pi^2/[G(m_1+m_2)]$, reducing to $T^2 \propto a^3$ only when comparing bodies around the same central mass. Comparing Earth's orbit with the Moon's directly gives nonsense.

**Pitfall 2: thinking the Sun is at rest while planets orbit it.** Both orbit the common centre of mass, with $m_1 r_1 = m_2 r_2$; for Jupiter and the Sun that centre lies outside the Sun's surface. The Sun's tiny wobble is precisely the basis of the radial-velocity method for finding exoplanets.

**Pitfall 3: claiming mechanical energy is not conserved on an ellipse.** On the contrary, $E = -GM\mu/(2a)$ is strictly conserved; what varies is the split between kinetic and potential energy—maximum kinetic and minimum (most negative) potential at perihelion.

**Pitfall 4: thinking escape speed depends on direction.** In an ideal model without atmosphere or rotation it does not, because energy is a scalar depending only on speed. Launching eastward saves fuel on Earth because of the planet's rotation, not because of gravity.

**Pitfall 5: assuming an orbit, once formed, never changes.** Many-body perturbations, tidal dissipation and gravitational radiation all alter orbits. Mercury's anomalous precession of about $43''$ per century can only be explained by general relativity—Newton's first counterexample.

## VIII. Extensions

Solving the two-body problem underlies all astronomical measurement. In a binary whose two spectra are both measurable, one obtains $m_1 + m_2$ and the mass ratio, hence each mass—the only direct route to stellar masses, which in turn fix luminosity, lifetime and final fate. Applying the same method to a galaxy, the velocity $v$ at radius $r$ on the rotation curve estimates the enclosed mass $M(<r) \approx v^2 r/G$, which leads directly to the dark matter problem (Chapter 6).

Two further extensions are worth remembering. The **restricted three-body problem**: when a third body is negligibly light, the system of two primaries on circular orbits has five equilibrium points, the Lagrange points L1–L5. L1, L2 and L3 lie on the line of centres and are unstable; L4 and L5 form equilateral triangles with the primaries and are stable for sufficiently extreme mass ratios—the Trojan asteroids cluster at Jupiter's L4 and L5. The Sun–Earth L1 and L2 host solar observatories and the Webb telescope, since they allow continuous viewing at low fuel cost. Second, **gravity assist**: a probe flying past a planet conserves energy in the planet's frame, but its heliocentric speed can increase—an exchange of momentum in a two-body scattering. Voyager reached interstellar speed by successive boosts from Jupiter and Saturn. The two-body problem is thus not just a textbook exercise but a daily tool of spaceflight.

Methodologically the chapter displays the standard approach of theoretical physics: find conservation laws from symmetry (uniform centre of mass, angular momentum, energy), use them to reduce a second-order vector equation to a one-dimensional radial problem, then classify all orbits by an energy criterion. This "conserve first, solve later" pattern recurs in stellar structure (hydrostatic equilibrium), the interstellar medium (Jeans criterion) and cosmology (Friedmann equation). Remember its limits too: with three or more comparable masses the system is generally non-integrable and requires perturbation theory, numerical integration—and chaos.`,
  },

  'stellar-observation': {
    chapter: 'Chapter 2 Observing Stars',
    title: 'Magnitudes, Spectra and the Hertzsprung–Russell Diagram',
    summary:
      'Astronomy compresses luminosities spanning a dozen orders of magnitude into the logarithmic magnitude scale, separates "how bright" from "how far" with the distance modulus, obtains temperatures from colour indices and spectral classes, and assembles them into the HR diagram—the map of stellar physics.',
    keyPoints: [
      'Pogson ratio: five magnitudes correspond to a factor 100 in brightness, $m_1 - m_2 = -2.5\\log_{10}(F_1/F_2)$',
      'Flux falls off as $F = L/(4\\pi d^2)$; absolute magnitude $M$ is the apparent magnitude at 10 pc',
      'Distance modulus $m - M = 5\\log_{10}(d/10\\,\\text{pc})$ is the core formula for distances and calibration',
      'Colour index $B-V$ reflects temperature and interstellar reddening; spectral types O B A F G K M run from hot to cool',
      'The HR diagram plots luminosity (or absolute magnitude) against effective temperature (or colour index); the main sequence is a mass sequence',
      'Main-sequence mass–luminosity relation $L/L_\\odot \\approx (M/M_\\odot)^{3.5}$, combined with $L = 4\\pi R^2\\sigma T_{\\text{eff}}^4$, gives radii',
    ],
    content: String.raw`

In the second century BC Hipparchus sorted the stars visible to the eye into six classes by how bright they looked: the brightest twenty or so first magnitude, those barely visible sixth. The scheme was purely subjective yet happened to match human physiology—the eye responds roughly logarithmically to brightness. In the nineteenth century Pogson calibrated it photometrically and found the average first-magnitude star about 100 times brighter than a sixth-magnitude one. Since five magnitudes mean a factor of 100, one magnitude means $100^{1/5} \approx 2.512$. That number, the Pogson ratio, is the foundation of the modern system.

Apparent magnitude is therefore defined strictly as a logarithm of flux:

$$m_1 - m_2 = -2.5\log_{10}\frac{F_1}{F_2}$$

Note the minus sign—the smaller the magnitude, the brighter the object. This counterintuitive convention is a historical legacy that cannot now be changed. The zero point is set by Vega and a set of standards: Vega has $m_V = 0.03$. On this scale the Sun is $-26.74$, Sirius $-1.46$, the naked-eye limit about $+6$, and the Hubble Space Telescope reaches about $+31$. Thirty-odd magnitudes correspond to a brightness ratio near $10^{13}$.

The beauty of a logarithmic scale is that it compresses astronomical ranges into mental arithmetic, and it matches error propagation: if the relative flux error is fixed, the absolute magnitude error is fixed too. The magnitude system is the classic case of "addition instead of multiplication"—brightness ratios become magnitude differences, which is very convenient for photometry and extinction corrections.

One warning: magnitudes always refer to a specific band and photometric system. Besides UBV there are SDSS ugriz, the Gaia G band and near-infrared JHK. Different systems have different zero points and bandwidths, so conversions need linear (sometimes quadratic) colour corrections, or systematic errors of a few per cent appear. Modern surveys emphasize standard star fields and cross-calibration precisely because such systematics, not statistical noise, often limit the conclusions.

## II. Apparent Magnitude, Luminosity and Flux

A star's true output is its **luminosity** $L$ (total radiated power in watts), while what we receive is the **flux**

$$F = \frac{L}{4\pi d^2}$$

the inverse-square law. It immediately exposes a fundamental difficulty: from "how bright it looks" alone you cannot distinguish a nearby candle from a distant searchlight. To compare true outputs, distance must be removed.

**Absolute magnitude** $M$ is defined for exactly this purpose: the apparent magnitude the star would have at 10 pc (1 pc $= 3.086\times 10^{16}\ \text{m} \approx 3.26$ light years). From the flux ratio

$$\frac{F}{F_{10}} = \left(\frac{10\ \text{pc}}{d}\right)^2$$

taking $-2.5\log_{10}$ gives the **distance modulus**

$$m - M = 5\log_{10}\frac{d}{10\ \text{pc}} = 5\log_{10}\frac{d}{\text{pc}} - 5$$

the most used formula in astronomical distance determination. Knowing the absolute magnitude (how bright the star "should" be) and measuring the apparent magnitude gives the distance, and vice versa. The Sun's apparent magnitude is $-26.74$ but it is only $1\ \text{AU} = 4.848\times 10^{-6}\ \text{pc}$ away, so

$$M_{V,\odot} = -26.74 - 5\log_{10}(4.848\times 10^{-7}) \approx 4.83$$

Moved to 10 pc the Sun would be a barely visible fifth-magnitude star—utterly ordinary on cosmic scales.

Conversely, if the distance is known (from trigonometric parallax, say), the apparent magnitude yields the luminosity, turning the HR diagram from a relative scatter plot into an absolutely calibrated physical diagram. Gaia has delivered microarcsecond parallaxes for nearly two billion stars, and this unglamorous work is what first gave the HR diagram a statistically complete absolute-magnitude sample and allowed almost all empirical relations of stellar physics to be recalibrated.

## III. Colour Indices and Interstellar Extinction

Magnitudes are always quoted for a band. The most common system is Johnson's UBV: U (ultraviolet, about 365 nm), B (blue, 440 nm), V (yellow-green, 550 nm). Subtracting two magnitudes gives a **colour index**, for example

$$B - V = m_B - m_V$$

Because smaller magnitude means brighter, a smaller $B-V$ means a bluer, hotter star, and a larger one a redder, cooler star. Typical values: about $-0.3$ for O stars, $0.00$ for A0, $+0.65$ for the Sun (G2V), $+1.0$ for K stars and beyond $+1.5$ for M stars. Effective temperature follows from an empirical calibration such as

$$T_{\text{eff}} \approx \frac{8540\ \text{K}}{(B-V) + 0.865}$$

For the Sun with $B-V = 0.65$ this gives $T_{\text{eff}} \approx 5640\ \text{K}$, close to the true $5772\ \text{K}$.

But a larger $B-V$ need not mean an intrinsically red star: scattering by interstellar dust also reddens starlight, since dust extinguishes short wavelengths more strongly—**interstellar reddening**. Define the colour excess $E(B-V) = (B-V)_{\text{obs}} - (B-V)_0$; empirically

$$A_V = R_V\,E(B-V),\qquad R_V \approx 3.1$$

In the Galactic plane visual extinction is about $1\sim 2\ \text{mag/kpc}$. Distances must therefore be extinction-corrected or they are systematically overestimated—one of the main error sources in early Cepheid distances.

## IV. Spectral Classification: Temperature Sequence and Luminosity Class

Arranging stellar spectra by their lines gives the Harvard sequence **O B A F G K M** ("Oh Be A Fine Girl, Kiss Me"). The apparently arbitrary letter order is in fact a **temperature sequence**:

O ($T \gtrsim 30000\ \text{K}$, blue, ionized helium He II) → B ($10000\sim 30000\ \text{K}$, neutral helium He I) → A ($7500\sim 10000\ \text{K}$, strongest hydrogen Balmer lines) → F ($6000\sim 7500\ \text{K}$, metallic lines appear) → G ($5200\sim 6000\ \text{K}$, strong Ca II H and K; the Sun is G2V) → K ($3700\sim 5200\ \text{K}$, metallic lines dominate) → M ($2400\sim 3700\ \text{K}$, molecular bands such as TiO).

A commonly misunderstood detail: the Balmer lines peak in A stars, not in the hottest O stars. They arise from transitions out of $n=2$; at very high temperature hydrogen is almost fully ionized and the $n=2$ population drops, while at low temperature most atoms sit in the ground state. Line strength is set by atomic level populations, not simply by "how much hydrogen there is".

Besides the temperature type, the Harvard sequence carries a **luminosity class** (Roman numerals): Ia (supergiant), Ib (bright supergiant), II (bright giant), III (normal giant), IV (subgiant), V (main-sequence dwarf). The criterion is mainly line width: giants have tenuous, low-pressure atmospheres and narrow lines, dwarfs dense atmospheres and pressure-broadened lines. The Sun's full designation is G2V—temperature plus luminosity class.

## V. The HR Diagram: a Physical Map of Stars

Early in the twentieth century Hertzsprung and Russell independently plotted luminosity (or absolute magnitude) against spectral type (or colour index, or effective temperature), producing the most important diagram in astronomy, the **Hertzsprung–Russell diagram**. By convention temperature runs along the horizontal axis but increases **to the left** (O at the left, M at the right), and luminosity increases upward.

Stars are not scattered uniformly but cluster into distinct regions:

- **Main sequence**: a diagonal band from upper left (blue, bright) to lower right (red, faint) containing about 90% of stars. Main-sequence cores fuse hydrogen, and the sequence is essentially a **mass sequence**: more mass means a hotter core and higher luminosity, empirically $L/L_\odot \approx (M/M_\odot)^{3.5}$.
- **Red giants and supergiants**: upper right, cool but very luminous, hence enormous radii. Betelgeuse has $T_{\text{eff}} \approx 3600\ \text{K}$ but $L \approx 1.2\times 10^5 L_\odot$.
- **White dwarfs**: lower left, hot but faint, hence tiny radii—the subject of Chapter 5.
- The **Hertzsprung gap** and the instability strip (home of the Cepheids).

Luminosity and effective temperature immediately give the radius:

$$L = 4\pi R^2\sigma T_{\text{eff}}^4\quad\Longrightarrow\quad \frac{R}{R_\odot} = \sqrt{\frac{L}{L_\odot}}\left(\frac{T_\odot}{T_{\text{eff}}}\right)^2$$

For Betelgeuse (with $T_\odot = 5772\ \text{K}$): $\sqrt{1.2\times 10^5}\approx 346$ times $(5772/3600)^2 \approx 2.57$ gives $R \approx 890 R_\odot$, nearly 6 AU—if placed at the Sun, it would swallow Mars's orbit. This agrees with direct interferometric measurements by the VLT.

The HR diagram is also the tool for **dating clusters**: stars in a cluster have the same age but different masses, and massive ones evolve faster and leave the main sequence first. The turn-off point gives the cluster age directly—the basic tool of Galactic archaeology.

## VI. Common Pitfalls

**Pitfall 1: larger magnitude means brighter.** The opposite. Magnitudes are a historical, inverted ranking: first magnitude is brighter than sixth, so a smaller number means a brighter object. Sirius at $-1.46$ is far brighter than Polaris at about $+2.0$.

**Pitfall 2: absolute magnitude is "true brightness".** It is still a magnitude (a logarithmic number), only standardized to 10 pc; the physical quantity is the luminosity $L$, differing by a constant: $M_{V,\odot} \approx 4.83$ corresponds to $L_\odot = 3.83\times 10^{26}\ \text{W}$.

**Pitfall 3: the distance modulus is band-independent.** The formula is right, but $m$ and $M$ must be in the same band and extinction must be corrected first. Reddening inflates the observed $m$ and hence the distance.

**Pitfall 4: red colour means low temperature.** It may be dust reddening, or an expanding red supergiant (huge radius rather than low temperature dominating). Temperature must come from spectral lines or an extinction-corrected colour index.

**Pitfall 5: temperature increases to the right on the HR diagram.** In the traditional plotting, spectral type $O\to M$ or colour index $B-V$ increases to the right, so temperature increases **to the left**. Always check the axis labels.

**Pitfall 6: all main-sequence stars "burn hydrogen".** Strictly only the core (above about $10^7\ \text{K}$) does; the envelope does not, which is the key to the main-sequence lifetime discussed in Chapter 3.

## VII. Extensions

One quantitative application deserves special mention: **Cepheids** lie in the instability strip above the main sequence, and their pulsation period is tightly related to luminosity (the period–luminosity relation, $M_V \approx -2.81\log_{10}P_{d} - 1.43$ with $P_d$ in days). Measuring the period gives the absolute magnitude, and with the apparent magnitude the distance follows from the distance modulus. Discovered by Leavitt in the Small Magellanic Cloud, this relation was Hubble's starting point for galaxy distances and is the second rung of the cosmic distance ladder. The pulsation mechanism itself is a heat engine in the helium ionization zone: heating ionizes helium, raises opacity and traps radiation to do work on the envelope; cooling and recombination release the energy, giving self-excited oscillation. Pulsation and stellar structure are two sides of one physics.

The HR diagram and distance modulus form the lower half of the modern **cosmic distance ladder**: trigonometric parallax (out to a few kpc) calibrates the Cepheid period–luminosity relation, Cepheids reach nearby galaxies, and these calibrate Type Ia supernovae and the Tully–Fisher relation, finally reaching the Hubble flow. Errors propagate at every step, so photometric accuracy and extinction correction remain the most basic work in cosmology.

Physically, placing a star on the HR diagram fixes its $L$ and $T_{\text{eff}}$, hence $R$; if it is on the main sequence the mass follows from the mass–luminosity relation. The three most basic parameters of a remote star that can never be measured directly are thus inferred. That is the typical style of astrophysics: use a few observables (magnitudes, colours, lines) and physical laws to infer inaccessible parameters, then place them on statistical diagrams to find the underlying regularity. The next chapter asks why main-sequence stars lie on that diagonal band—the answer lies in the pressure and temperature balance inside stars.`,
  },

  'stellar-structure': {
    chapter: 'Chapter 3 Stellar Structure and Evolution',
    title: 'Hydrostatic Equilibrium',
    summary:
      'A star neither collapses nor explodes because the outward pressure gradient balances self-gravity everywhere; the four equations of stellar structure, with the virial theorem and nuclear energy generation, give main-sequence lifetimes and evolutionary tracks.',
    keyPoints: [
      'Four structure equations: mass continuity $dM/dr = 4\\pi r^2\\rho$, hydrostatic equilibrium $dP/dr = -GM(r)\\rho/r^2$, energy generation $dL/dr = 4\\pi r^2\\rho\\varepsilon$, energy transport',
      'Hydrostatic equilibrium requires a central pressure $P_c \\sim GM^2/R^4$; the Sun has about $2.5\\times 10^{16}\\,\\text{Pa}$',
      'The ideal-gas equation gives $T_c \\sim \\mu m_H GM/(kR)$, about $1.5\\times 10^7\\,\\text{K}$ for the Sun',
      'Virial theorem $2K + \\Omega = 0$, hence $E = \\Omega/2 = -K$: stars have negative heat capacity',
      'Fusion $4\\text{H}\\to\\text{He}$ releases $26.7\\,\\text{MeV}$, a mass defect of about $0.7\\%$',
      'Main-sequence lifetime $t_{MS} \\approx 10^{10}\\,\\text{yr}\\,(M/M_\\odot)/(L/L_\\odot)$; with $L\\propto M^{3.5}$ this gives $t\\propto M^{-2.5}$',
    ],
    content: String.raw`

A star is a self-gravitating ball of gas. Every layer is pulled inward by all the mass above it; without support the whole star would collapse in free fall within minutes. With too much pressure it would blow itself apart. Observations show that stars shine steadily for extremely long times with tiny luminosity changes—the Sun's luminosity has varied by no more than tens of per cent over billions of years. The interior must therefore be in a delicate balance: inward gravity and the outward pressure gradient cancel almost exactly everywhere and at every moment—**hydrostatic equilibrium**.

Better still, the balance is **self-regulating**. Compress a layer slightly and its density and temperature rise, the pressure increases, the outward gradient strengthens and pushes it back; expand it and it cools, the pressure falls and gravity wins. This negative feedback keeps stars stable, responding on the sound-crossing time, the **dynamical timescale**, about half an hour for the Sun. Because that is far shorter than a stellar lifetime, stars can be treated as quasi-static.

## II. The Four Equations of Stellar Structure

A spherically symmetric, non-convecting steady star is described by four first-order ODEs. Let $r$ be the distance from the centre, $M(r)$ the mass inside, $L(r)$ the luminosity crossing radius $r$, and $\rho(r)$, $P(r)$, $T(r)$ the local density, pressure and temperature.

**1. Mass continuity**

$$\frac{dM}{dr} = 4\pi r^2\rho(r)$$

**2. Hydrostatic equilibrium**

For a thin shell between $r$ and $r+dr$, the upward force from the pressure difference balances the weight of the shell:

$$\frac{dP}{dr} = -\frac{G M(r)\rho(r)}{r^2}$$

The minus sign means pressure decreases outward.

**3. Energy generation**

$$\frac{dL}{dr} = 4\pi r^2\rho(r)\,\varepsilon(r)$$

where $\varepsilon$ is the nuclear energy generation rate per unit mass (W/kg). It is extremely temperature sensitive: roughly $\varepsilon \propto T^4$ for the pp chain and as steep as $\varepsilon \propto T^{16}$ for the CNO cycle—which is why energy generation is so concentrated in the core.

**4. Energy transport**

In radiative zones photons diffuse, with temperature gradient

$$\frac{dT}{dr} = -\frac{3\kappa\rho L(r)}{16\pi a c\,r^2 T^3}$$

where $\kappa$ is the opacity (cross-section per unit mass, m²/kg) and $a = 4\sigma/c$ the radiation constant. If the radiative gradient is too steep, convection sets in; the Schwarzschild criterion is that the radiative gradient exceeds the adiabatic one, after which blobs of matter carry the energy and the gradient approaches the adiabatic value.

These four equations must be closed with an **equation of state** (usually $P = \rho kT/(\mu m_H)$ with mean molecular weight $\mu$, or degeneracy pressure at high density) and an **opacity law** (such as Kramers' $\kappa \propto \rho T^{-3.5}$). Boundary conditions are $M(0)=0$, $L(0)=0$ at the centre and $P\approx 0$, $L(R) = 4\pi R^2\sigma T_{\text{eff}}^4$ at the surface.

## III. Order-of-Magnitude Estimates: Central Pressure and Temperature

Full solutions need computers, but the key magnitudes follow from simple balance arguments with remarkable accuracy.

**Central pressure**: write hydrostatic equilibrium as $P_c/R \sim G M\rho/R^2$ and take $\rho \sim M/R^3$:

$$P_c \sim \frac{GM^2}{R^4}$$

For the Sun, $G M_\odot^2/R_\odot^4 \approx 1.1\times 10^{15}\ \text{Pa}$, within a factor of about 20 (a density-profile factor) of the true $P_c \approx 2.5\times 10^{16}\ \text{Pa}$—some $2.5\times 10^{11}$ atmospheres.

**Central temperature**: from $P = \rho kT/(\mu m_H)$ with $\rho \sim M/R^3$ and the $P_c$ above,

$$T_c \sim \frac{\mu m_H G M}{k R}$$

For the Sun with $\mu \approx 0.6$ (hydrogen-helium mixture, more particles after ionization): $T_c \approx 1.4\times 10^7\ \text{K}$, almost identical to the standard solar model's $1.5\times 10^7\ \text{K}$. This matters: it says the interior is hot enough for nuclei to overcome the Coulomb barrier, even though the mean thermal energy $kT \approx 1.2\ \text{keV}$ is far below the classical barrier (of order MeV)—fusion proceeds through quantum tunnelling and the high-energy tail of the Maxwell distribution.

## IV. The Virial Theorem

For a steady self-gravitating system there is an important theorem independent of detailed structure. Define the moment of inertia $I = \sum_i m_i r_i^2$; its second derivative is

$$\frac12\frac{d^2 I}{dt^2} = 2K + \Omega$$

with $K$ the total kinetic energy (including thermal motion) and $\Omega$ the total gravitational potential energy (negative for a bound system). In steady state the long-time average of $d^2I/dt^2$ vanishes, so

$$2K + \Omega = 0\quad\Longrightarrow\quad E = K + \Omega = \frac{\Omega}{2} = -K$$

This is the **virial theorem**, with several deep consequences.

First, the total energy is negative and equals half the gravitational energy. Measuring a star's luminosity and radius therefore estimates $\Omega \approx -GM^2/R$ (exactly $-3GM^2/5R$ for a uniform sphere) and hence how long it can keep shining.

Second, stars have **negative heat capacity**. Since $K = -E$, radiating energy makes $E$ more negative, so $K$—and the temperature—increases. This is contrary to everyday experience but is the core mechanism of evolution: when core hydrogen runs out and nuclear generation stops, the core does not cool but contracts for lack of radiation pressure, and **half of the released gravitational energy becomes heat (raising the temperature further) while half is radiated**, until it is hot enough to ignite the next stage (helium burning). That is how stars "burn hotter and hotter, igniting shell after shell".

Third, the virial theorem is a universal balance for masses. For a cluster, the velocity dispersion $\sigma$ and size $R$ with $2K + \Omega = 0$ give $M \sim \sigma^2 R/G$—the method by which Zwicky found the "missing mass" in Coma in 1933.

## V. Nuclear Burning and the Main-Sequence Lifetime

Main-sequence energy comes from hydrogen fusing to helium: $4\,^1\text{H} \to \,^4\text{He} + 2e^+ + 2\nu_e$, with net release $Q = 26.7\ \text{MeV}$, i.e. a fraction

$$\eta = \frac{26.7\ \text{MeV}}{4\times 938\ \text{MeV}} \approx 0.007$$

of the rest mass converted—more than ten million times chemical burning. The Sun must consume about $6\times 10^{11}\ \text{kg}$ of hydrogen per second to sustain $L_\odot = 3.83\times 10^{26}\ \text{W}$, yet even so its whole mass would last tens of billions of years:

$$t_{\text{nuc}} \approx \frac{0.007 M c^2}{L}$$

This overestimates, because only the hot core (about 10% of the mass) actually burns hydrogen. Hence

$$t_{MS} \approx \frac{0.007\times 0.1\,M c^2}{L} \approx 10^{10}\ \text{yr}\,\frac{M/M_\odot}{L/L_\odot}$$

For the Sun about $10^{10}$ years; at 4.6 Gyr it is in its prime. With $L/L_\odot \approx (M/M_\odot)^{3.5}$,

$$t_{MS} \approx 10^{10}\ \text{yr}\left(\frac{M}{M_\odot}\right)^{-2.5}$$

This scaling explains the most important feature of the HR diagram: massive blue stars have more fuel but consume it far faster and live briefly. A $10 M_\odot$ star lasts only about $3\times 10^7$ years, while a $0.5 M_\odot$ red dwarf burns stably for hundreds of billions of years, far beyond the age of the Universe—so no dead stars below about $0.8 M_\odot$ exist today.

There are two main hydrogen channels. Lower-mass, cooler cores ($T \lesssim 1.8\times 10^7\ \text{K}$) use the **pp chain**, with mild temperature dependence ($\varepsilon \propto T^4$) and a broad generation region; more massive, hotter cores use the **CNO cycle**, in which carbon, nitrogen and oxygen act only as catalysts, with $\varepsilon \propto T^{16}$-like sensitivity. The latter concentrates generation in the core and drives a **convective core**, mixing fuel and lengthening the main-sequence life slightly. About 99% of the Sun's energy comes from the pp chain and 1% from CNO. Both produce neutrinos, which barely interact and escape in minutes (photons take tens to hundreds of thousands of years to diffuse out), making neutrinos our only real-time probe of stellar cores.

## VI. Three Timescales and Quasi-Static Evolution

Evolution can be described as a sequence of equilibrium models because three timescales differ enormously:

- **Dynamical** $t_{\text{dyn}} \sim \sqrt{R^3/(GM)}$, about 27 minutes for the Sun; it sets the mechanical response to perturbations.
- **Thermal (Kelvin–Helmholtz)** $t_{KH} \sim GM^2/(RL)$, the time gravity could sustain the present luminosity, about $3\times 10^7$ years for the Sun.
- **Nuclear** $t_{\text{nuc}} \sim 0.007Mc^2/L$, about $10^{10}$ years for the Sun.

Their ratio is about $1 : 10^{11} : 10^{13}$. Because $t_{\text{dyn}} \ll t_{KH} \ll t_{MS}$, a star is always in hydrostatic and thermal equilibrium; evolution is only "nuclear composition changes slowly, so the equilibrium model shifts slowly". This separation is the foundation of stellar structure theory.

A final note on opacity: $\kappa$ in the transport equation sets the steepness of the temperature gradient and hence whether transport is radiative or convective. The Sun's outer convection zone exists precisely because in the temperature range where hydrogen ions begin to form, $\kappa$ rises sharply and radiative efficiency collapses. A microscopic atomic parameter thus determines the macroscopic structure—an example of the many "micro determines macro" links in stellar physics.

## VII. Common Pitfalls

**Pitfall 1: "hydrogen burning" is chemical burning.** It is nuclear fusion via the strong interaction and quantum tunnelling, with no oxygen involved; chemical flames involve outer electrons only, eight orders of magnitude lower in energy.

**Pitfall 2: the whole star burns hydrogen.** Only about 10% of the mass, the core above $T \gtrsim 10^7\ \text{K}$, does. The envelope and atmosphere take no part, which is why the lifetime carries the factor 0.1.

**Pitfall 3: a star that loses energy cools.** By the virial theorem the heat capacity is negative: radiating energy leads to contraction and heating. Late-stage cores heat up for exactly this reason.

**Pitfall 4: taking $\Omega$ positive in the virial theorem.** Gravitational potential energy must be negative (zero at infinity), otherwise $2K+\Omega=0$ cannot hold. Watch signs in every application.

**Pitfall 5: equating the main-sequence lifetime with the nuclear timescale.** The nuclear timescale assumes all the mass burns; only about a tenth is effective fuel, and massive stars have convective cores and mass loss that shift the estimate further.

## VIII. Extensions

Stellar structure theory is the calibrator of all astrophysics. The standard solar model once predicted a neutrino flux a factor of three above observation; the "solar neutrino problem" was solved not by changing the model but by neutrino oscillations (neutrino mass)—an astrophysical observation pointing directly at new particle physics.

Looking ahead, a star's fate is set by its mass: below about $8 M_\odot$ it sheds a planetary nebula as a red giant and leaves a carbon-oxygen white dwarf; heavier stars burn all the way to iron, lose support when iron fusion stops releasing energy, and collapse in a core-collapse supernova, leaving a neutron star or black hole. Those compact objects are Chapter 5; the birth of stars from gravitationally unstable molecular clouds is the Jeans criterion of Chapter 4.

Methodologically the chapter continues Chapter 1: write the conservation/equilibrium equations (here force balance and energy conservation), use order-of-magnitude analysis to isolate the main physics, and finish with scaling laws. Astrophysics rarely offers exact solutions, but with the right magnitudes and scalings it answers "why is it so".`,
  },

  'interstellar-medium': {
    chapter: 'Chapter 4 Interstellar Medium and Star Formation',
    title: 'The Jeans Criterion',
    summary:
      'The interstellar medium is thin but vast; a cloud collapses once its self-gravity beats the pressure of thermal motion. The Jeans criterion gives the critical length and mass of that contest and is the starting point for understanding cloud fragmentation and protostar birth.',
    keyPoints: [
      'The ISM is mostly gas (about $70\\%$ hydrogen, $28\\%$ helium) with about $1\\%$ dust, and coexists in several thermal phases',
      'Molecular clouds have typically $T \\approx 10\\,\\text{K}$, $n \\approx 10^2\\sim 10^6\\,\\text{cm}^{-3}$ and are the birthplaces of stars',
      'Isothermal sound speed $c_s = \\sqrt{kT/(\\mu m_H)}$, Jeans length $\\lambda_J = c_s\\sqrt{\\pi/(G\\rho)}$',
      'Jeans mass $M_J = \\frac{\\pi}{6}\\rho\\lambda_J^3 = \\frac{\\pi^{5/2}}{6}\\frac{c_s^3}{G^{3/2}\\rho^{1/2}}$, which falls as $M_J \\propto \\rho^{-1/2}$ at higher density',
      'Free-fall time $t_{ff} = \\sqrt{3\\pi/(32G\\rho)}$, about $10^6$ years for a typical molecular cloud',
      'Collapse is isothermal then adiabatic, with hierarchical fragmentation; the protostar contracts along the Hayashi track to the zero-age main sequence, and star formation efficiency is only a few per cent',
    ],
    content: String.raw`

The space between stars is not an empty vacuum. The Galactic disk is filled with a thin **interstellar medium** (ISM), holding roughly ten per cent or so of the Galaxy's baryonic mass. Its mean density is about one hydrogen atom per cubic centimetre—far thinner than the best laboratory vacuum—but over enormous volumes it totals billions of solar masses.

The ISM is mostly gas: by mass about 71% hydrogen, 27% helium and 2% "metals" (in astronomy, everything heavier than helium); in addition about 1% by mass is **dust** (silicate and graphite grains, roughly 0.1 $\mu$m). Though a tiny fraction, dust is crucial for interstellar chemistry and star formation: it provides surfaces for H₂ formation, shields ultraviolet radiation to keep clouds cold, and carries away gravitational energy by infrared radiation.

By temperature and density the ISM occupies several coexisting phases: hot ionized medium ($T \sim 10^6\ \text{K}$, $n \sim 0.003\ \text{cm}^{-3}$, heated by supernovae), warm neutral medium ($T\sim 8000\ \text{K}$, $n \sim 0.3\ \text{cm}^{-3}$), cold neutral medium ($T\sim 100\ \text{K}$, $n \sim 30\ \text{cm}^{-3}$) and the densest **molecular clouds** ($T \sim 10\ \text{K}$, $n \sim 10^2\sim 10^6\ \text{cm}^{-3}$). They are roughly in pressure balance: the cold phases are dense and small, the hot ones tenuous and extended.

Observationally, cold atomic hydrogen is traced by the 21 cm hyperfine line, molecular hydrogen—which radiates little when cold—by CO rotational lines, and ionized hydrogen by Hα recombination. Dust extinction and reddening are both a nuisance (blocking background starlight) and a tool (infrared and submillimetre bands see the thermal emission of cold dust directly).

Stars form only in the coldest molecular clouds. **Giant molecular clouds** reach $10^5\sim 10^6 M_\odot$ over tens to a hundred parsecs, with complex turbulent filamentary structure. They are roughly in virial balance, $2K + \Omega \approx 0$, with $K$ including turbulence and magnetic fields. What actually triggers collapse is usually a local increase in density (turbulent convergence, cloud-cloud collisions, supernova shock compression) that pushes some region past the critical condition—the question the Jeans criterion answers.

## II. The Jeans Criterion: When Self-Gravity Wins

Consider a uniform gas of density $\rho$ and temperature $T$ containing a density perturbation of scale $R$. Can it grow under its own gravity? Two effects compete: thermal pressure tends to erase the perturbation, self-gravity to amplify it.

**Sound speed**: pressure disturbances propagate at

$$c_s = \sqrt{\frac{\gamma kT}{\mu m_H}}$$

For molecular clouds one usually takes the isothermal limit $\gamma = 1$ (cooling is efficient and compressive heating is radiated away) and $\mu \approx 2.33$ (molecular hydrogen weighting).

**Timescale comparison**: a sound wave crosses the perturbation in $t_s = R/c_s$, while free-fall under self-gravity takes

$$t_{ff} = \sqrt{\frac{3\pi}{32G\rho}}$$

If $t_{ff} < t_s$ the gas is crushed by gravity before pressure can smooth it, so the perturbation grows. Setting the two equal gives the critical scale.

**Perturbation analysis** (more rigorous): linearize the continuity, Euler and Poisson equations with perturbations $\propto e^{i(\omega t - kx)}$ to obtain the dispersion relation

$$\omega^2 = c_s^2 k^2 - 4\pi G\rho_0$$

For small enough $k$ (large enough scales) the second term dominates, $\omega^2 < 0$, and perturbations grow exponentially instead of oscillating. The critical wavenumber is $k_J = \sqrt{4\pi G\rho}/c_s$, corresponding to

$$\lambda_J = \frac{2\pi}{k_J} = c_s\sqrt{\frac{\pi}{G\rho}}$$

the **Jeans length**. The corresponding **Jeans mass** (a sphere of diameter $\lambda_J$, equivalently $M_J = \frac{\pi}{6}\rho\lambda_J^3$) is

$$M_J = \frac{\pi}{6}\rho\lambda_J^3 = \frac{\pi^{5/2}}{6}\frac{c_s^3}{G^{3/2}\rho^{1/2}} \approx 2.92\,\frac{c_s^3}{G^{3/2}\rho^{1/2}}$$

or, directly in temperature,

$$M_J = \frac{\pi^{5/2}}{6}\left(\frac{kT}{G\mu m_H}\right)^{3/2}\rho^{-1/2}$$

The meaning is clear: **thermal pressure can only support small scales, while on large scales self-gravity must win**, and $M_J\propto \rho^{-1/2}$ says that denser gas can collapse from a smaller minimum mass.

**Typical numbers**: for a cloud core with $T = 10\ \text{K}$ and $n = 10^3\ \text{cm}^{-3}$, $\rho = n\mu m_H \approx 3.9\times 10^{-18}\ \text{kg/m}^3$ and $c_s \approx 188\ \text{m/s} = 0.19\ \text{km/s}$, so

$$\lambda_J \approx 2.1\times 10^{16}\ \text{m} \approx 0.67\ \text{pc},\qquad M_J \approx 1.8\times 10^{31}\ \text{kg} \approx 9 M_\odot$$

with $t_{ff} \approx 1.1\times 10^6\ \text{yr}$. These match observed core sizes (about 0.1–1 pc) and star formation timescales (millions of years), showing that the criterion captures the main physics.

## III. The Collapse: from Isothermal to Adiabatic

Collapse is not a whole cloud falling in unison. It proceeds **inside-out**: the centre is densest, has the shortest $t_{ff}$, collapses first into a dense core, and the collapsing region's boundary moves outward.

Early on the gas is thin and transparent, dust and molecular line cooling are very efficient, and compression heat is radiated at once: the compression is nearly **isothermal**. The temperature stays nearly constant while the density rises, so $M_J \propto \rho^{-1/2}$ falls and the parent cloud **fragments hierarchically** into ever smaller pieces, ending in a cluster of stars rather than one giant star—the first-level answer to "why are stellar masses typically $0.1\sim 100 M_\odot$ and not arbitrarily large".

When the density reaches about $10^{10}\ \text{cm}^{-3}$ the core becomes optically thick, cooling fails, compression becomes **adiabatic**, the temperature rises quickly, the Jeans mass grows again and fragmentation stops, forming a first hydrostatic core (a few AU). Later H₂ dissociation near 2000 K absorbs heat and triggers a second collapse, producing the **protostar** (the second core).

Two complications must be handled. **Angular momentum**: even a tiny rotation of the cloud core, conserved during collapse, would spin the core up until centrifugal force prevents further contraction. Observed stars carry four to six orders of magnitude less angular momentum than their natal cores, so the excess must be removed—through protoplanetary disks, bipolar outflows, magnetic braking and turbulent transport. **Magnetic support**: field lines frozen into ionized gas resist collapse perpendicular to them, and ambipolar diffusion (neutrals slipping past the field) or turbulent reconnection must weaken it—the notion of a magnetic critical mass.

## IV. From Protostar to Zero-Age Main Sequence

The protostar keeps accreting from its envelope and disk while driving fast bipolar outflows (up to hundreds of km/s)—the main way angular momentum is removed and an observational signature of young stars. These are the **T Tauri** stars (low mass) and Herbig Ae/Be stars (intermediate mass), with strong infrared and ultraviolet excess and accretion/outflow features.

The protostar then contracts along the **Hayashi track**: fully convective, it descends almost vertically on the HR diagram (luminosity falls, effective temperature nearly constant), because the surface temperature of a fully convective star is set by convective instability and is nearly independent of radius. Once a radiative core forms, it turns onto the **Henyey track**, moving nearly horizontally to the left (hotter).

At about $10^6\ \text{K}$ deuterium ignites (scarce, acting only as a thermostat); at about $10^7\ \text{K}$ hydrogen ignites and the star reaches the **zero-age main sequence** (ZAMS). The time to reach it is set by the thermal timescale and shrinks with mass: about $3\times 10^7$ years for $1 M_\odot$ but only $10^5$ years for $15 M_\odot$—the latter begins main-sequence burning before its envelope is fully accreted.

A final counterintuitive fact: **star formation is inefficient**. Only a few per cent of a cloud's gas turns into stars per free-fall time. The reason is feedback: ultraviolet radiation, winds, expanding H II regions and finally supernovae from massive stars blow the remaining gas away and end the episode. This explains why giant molecular clouds live only tens of millions of years and why galaxies do not convert all their gas into stars at once.

## V. Common Pitfalls

**Pitfall 1: the Jeans mass is the stellar mass.** No. It is only the threshold for whether a clump can be crushed by gravity; the final mass is set by fragmentation, competitive accretion, radiative feedback and outflows, and yields the **initial mass function** (Salpeter-like, $dN/dM \propto M^{-2.35}$, peaking at $0.2\sim 0.3 M_\odot$), far below the Jeans mass of a typical cloud.

**Pitfall 2: the Jeans criterion is sufficient.** It is only necessary. Real cores also have turbulent, magnetic and rotational support, so exceeding the Jeans condition need not cause immediate collapse; conversely many sub-Jeans cores are observed.

**Pitfall 3: collapse is a synchronous free fall.** Real collapse propagates inside-out, the centre forming a core first while outer layers fall later, leaving an $r^{-2}$ power-law envelope.

**Pitfall 4: molecular clouds are "cold hydrogen balloons".** They contain strong (supersonic, Mach number above 10) turbulence, magnetic fields and filamentary structure; only with turbulence and fields in the virial balance does the mass estimate come out right.

**Pitfall 5: the ISM can be treated as vacuum.** Despite the low density, dust extinction reaches $1\sim 2$ mag/kpc in the Galactic plane, hugely affecting optical observations, and the ISM is a key link in the Galactic baryon cycle.

## VI. Extensions

Observationally, star birth is recorded in infrared and millimetre images: Herbig–Haro objects are shock-excited knots from outflows; filaments with widths near 0.1 pc match predictions from turbulence and the Jeans scale; dust continuum and CO lines let us weigh disks and map their temperatures, seeing planetary cradles directly. ALMA has revealed rings and spiral arms in many disks, several of them carved by forming planets.

Star formation is one of the most active frontiers of astrophysics. Infrared and submillimetre facilities (Spitzer, Herschel, ALMA, JWST) see through dust to protostars and disks; theoretically the competition between turbulent fragmentation, competitive accretion and radiative feedback is still debated, and simulations reproduce the rough shape of the IMF but not all details.

On larger scales the star formation rate follows the empirical **Kennicutt–Schmidt law** $\Sigma_{SFR} \propto \Sigma_{gas}^{1.4}$, linking the microphysics of this chapter (Jeans criterion, feedback) to the galaxy evolution of Chapter 6: galaxies form stars most vigorously at cosmic noon ($z \sim 2$) because gas supply then peaked.

Methodologically the Jeans criterion is the most beautiful astrophysical example of linear stability analysis: write the equilibrium, add a small perturbation, and see whether it oscillates or grows exponentially. The same method analyses accretion disk instabilities, spiral arm formation and cosmological structure growth. It reminds us that to decide whether a system evolves you need not solve the full nonlinear problem—only the first-order term.`,
  },

  'compact-objects': {
    chapter: 'Chapter 5 Compact Objects',
    title: 'White Dwarfs, Neutron Stars and Black Holes',
    summary:
      'When a star exhausts its nuclear fuel, what supports it is no longer thermal pressure but quantum degeneracy pressure; white dwarfs, neutron stars and black holes are three different endpoints, defined by electron degeneracy, neutron degeneracy and the absolute victory of gravity.',
    keyPoints: [
      'White dwarfs are supported by electron degeneracy pressure; the more massive, the smaller: $R \\propto M^{-1/3}$, with radii comparable to Earth',
      'The Chandrasekhar limit $M_{Ch} \\approx 5.83/\\mu_e^2\\,M_\\odot \\approx 1.44\\,M_\\odot$ ($\\mu_e = 2$) comes from relativistic degeneracy',
      'Neutron stars have radii of about 10–12 km and densities near nuclear, $\\rho \\approx 2.8\\times 10^{17}\\,\\text{kg/m}^3$, supported by neutron degeneracy and nuclear forces',
      'Schwarzschild radius $R_s = 2GM/c^2 \\approx 2.95\\,\\text{km}\\,(M/M_\\odot)$: about 3 km for the Sun, 8.9 mm for Earth',
      'A black hole is described by mass, angular momentum and charge only (no-hair theorem); not even light escapes from inside the event horizon',
      'Hawking temperature $T_H = \\hbar c^3/(8\\pi GM k_B) \\approx 6\\times 10^{-8}\\,\\text{K}\\,(M_\\odot/M)$; evaporation times far exceed the age of the Universe',
    ],
    content: String.raw`

Chapter 3 showed that stars hold themselves up against gravity with the pressure generated by nuclear energy release. But fuel is finite: hydrogen, then helium, then carbon, neon, oxygen, silicon, all the way to iron. Iron has the highest binding energy per nucleon; neither fusion nor fission releases energy, so the core loses its energy source and its support. Only two paths remain: find a **pressure that does not depend on temperature**, or collapse all the way. The first gives white dwarfs and neutron stars, the second black holes.

That temperature-independent pressure is the quantum-mechanical **degeneracy pressure**. The Pauli exclusion principle forbids two fermions from occupying the same quantum state, so squeezing electrons or neutrons into a smaller volume forces them into higher momentum states, generating enormous pressure. Its key feature: pressure depends only on density, hardly on temperature. This has a severe consequence—a degenerate object does not collapse even when it cools nearly to absolute zero, so it simply fades into a cooling ember; conversely it cannot regulate itself by heating, and beyond some mass limit degeneracy pressure fails altogether. That limit is one of the central results of this chapter.

## II. White Dwarfs and Electron Degeneracy Pressure

Stars below about $8 M_\odot$ shed their envelopes as planetary nebulae during the red giant and asymptotic giant phases, leaving a hot degenerate carbon-oxygen core—a **white dwarf**. A typical white dwarf has $0.5\sim 1.2 M_\odot$ within a radius of only about $10^4\ \text{km}$, comparable to Earth.

**Non-relativistic degeneracy pressure**: electrons are fermions filling the Fermi sea at zero temperature. At number density $n_e$ the Fermi momentum is $p_F = \hbar(3\pi^2 n_e)^{1/3}$; non-relativistically $E_F = p_F^2/2m_e$ and

$$P = \frac{2}{5}n_e E_F = \frac{\hbar^2}{5m_e}(3\pi^2)^{2/3}n_e^{5/3} \propto n_e^{5/3}$$

Ignoring numerical factors, $P \sim \hbar^2 n_e^{5/3}/m_e$.

**Mass–radius relation**: combining $n_e \sim N_e/R^3 \sim M/(\mu_e m_H R^3)$ (where $\mu_e$ is the number of baryons per electron, about 2 for a carbon-oxygen white dwarf) with the hydrostatic estimate $P_c \sim GM^2/R^4$:

$$\frac{GM^2}{R^4} \sim \frac{\hbar^2}{m_e}\left(\frac{M}{\mu_e m_H R^3}\right)^{5/3}
\quad\Longrightarrow\quad
R \propto M^{-1/3}$$

So the **more massive the star, the smaller the radius**—the most counterintuitive property of white dwarfs. Quantitatively $R \approx 0.011 R_\odot\,(M/M_\odot)^{-1/3}$; for one solar mass, $R \approx 7.7\times 10^6\ \text{m}$ with mean density

$$\bar\rho = \frac{3M}{4\pi R^3} \approx 1.8\times 10^9\ \text{kg/m}^3 = 1.8\times 10^6\ \text{g/cm}^3$$

so a cubic centimetre of white-dwarf matter weighs nearly two tonnes—a lump the weight of a small car.

Observationally, white dwarf surface gravity exceeds Earth's by more than five orders of magnitude, so lines are strongly pressure broadened. That lets astronomers derive surface gravity and effective temperature from line profiles, and hence mass via the mass–radius relation. Sirius B was the first confirmed white dwarf ($M \approx 1.02 M_\odot$, $R \approx 0.0084 R_\odot$, smaller than Earth); its odd combination of high density and low luminosity puzzled Eddington and others until Fowler explained it with degeneracy pressure. A million or so white dwarfs are now known, and the cutoff in their luminosity function at the cooling timescale is used to date the Galactic disk and globular clusters.

## III. The Chandrasekhar Limit

The derivation above assumed non-relativistic electrons. But $p_F \propto n_e^{1/3}$: higher mass means smaller radius, higher density and larger Fermi momentum, so the electrons eventually become relativistic. In the extreme relativistic limit $E_F \approx p_F c$,

$$P \sim \hbar c\,n_e^{4/3}$$

The density dependence drops from $5/3$ to $4/3$. Combining with $P_c \sim GM^2/R^4$:

$$\frac{GM^2}{R^4} \sim \hbar c\left(\frac{M}{\mu_e m_H R^3}\right)^{4/3}
\quad\Longrightarrow\quad
\frac{GM^2}{R^4} \sim \frac{\hbar c}{(\mu_e m_H)^{4/3}}\frac{M^{4/3}}{R^4}$$

$R$ **cancels completely**. In the extreme relativistic regime hydrostatic equilibrium can hold at only one particular mass: below it degeneracy pressure is more than enough ($R$ adjusts itself), above it no radius allows degeneracy pressure to resist gravity and collapse must continue. This critical mass is the **Chandrasekhar limit**

$$M_{Ch} \approx \frac{5.83}{\mu_e^2}M_\odot$$

For a carbon-oxygen white dwarf with $\mu_e \approx 2$ this gives $M_{Ch} \approx 1.46 M_\odot$ (with electrostatic and finite-temperature corrections the often-quoted value is $1.44 M_\odot$). A more exact form is

$$M_{Ch} = \frac{\omega_3^0\sqrt{3\pi}}{2}\left(\frac{\hbar c}{G}\right)^{3/2}\frac{1}{(\mu_e m_H)^2},\qquad \omega_3^0 \approx 2.018$$

where $(\hbar c/G)^{3/2}$ is built from the Planck mass: the limit is essentially **a mass scale set jointly by quantum mechanics ($\hbar$), relativity ($c$) and gravity ($G$)**—a rare appearance of fundamental constants on a macroscopic astronomical object. Chandrasekhar worked it out in 1930, aged nineteen, on a ship to Cambridge.

Its direct consequence is the **Type Ia supernova**: when a white dwarf in a binary accretes matter and approaches $M_{Ch}$, the central temperature reaches carbon ignition and thermonuclear burning in the degenerate core runs away (no expansion-cooling feedback), destroying the star in seconds. Because the exploding mass is locked near the same critical value, Type Ia supernovae have very uniform luminosities and serve as standard candles—the 1998 discovery of cosmic acceleration rests on them.

## IV. Neutron Stars

If the collapsing core exceeds the Chandrasekhar limit, electrons are forced into protons to make neutrons ($e^- + p \to n + \nu_e$) and the object becomes a **neutron star**, supported by neutron degeneracy pressure and by the strong interaction (nuclear repulsion at extreme pressure).

Typical parameters: mass $1.1\sim 2.3 M_\odot$ (the heaviest known is about $2.35 M_\odot$), radius only $10\sim 12\ \text{km}$, mean density at nuclear saturation,

$$\rho_{\text{nuc}} \approx 2.8\times 10^{17}\ \text{kg/m}^3 = 2.8\times 10^{14}\ \text{g/cm}^3$$

about **three hundred million tonnes per cubic centimetre**. Surface gravity is so strong that escape speed approaches half the speed of light, and general-relativistic effects (gravitational redshift $z \sim 0.3$) cannot be ignored.

Unlike white dwarfs, the maximum neutron star mass has no simple closed form because the equation of state of nuclear matter above saturation density is uncertain. The general-relativistic TOV equation (Tolman–Oppenheimer–Volkoff, the relativistic generalization of hydrostatic equilibrium)

$$\frac{dP}{dr} = -\frac{G(\rho + P/c^2)(M(r) + 4\pi r^3 P/c^2)}{r^2(1 - 2GM(r)/rc^2)}$$

gives a theoretical upper limit of about $2\sim 3 M_\odot$ depending on the stiffness of the equation of state. Accurate mass and radius measurements of massive neutron stars (for example X-ray pulse profile fitting by NICER) are therefore an important route to constraining nuclear physics.

**Pulsars**: a neutron star's strong magnetic field (typically $10^8\ \text{T}$, i.e. $10^{12}\ \text{G}$; magnetars reach $10^{11}\ \text{T}$) combined with rapid rotation produces lighthouse-like periodic radio pulses. Hewish and Bell found the first pulsar in 1967 (period 1.337 s, jokingly called LGM-1) and it was soon identified as a rotating neutron star. The rotational energy is $E_{rot} = \tfrac12 I\omega^2$; with $I \approx 10^{38}\ \text{kg}\cdot\text{m}^2$ and a 33 ms period (the Crab pulsar) this gives $E_{rot} \approx 2\times 10^{42}\ \text{J}$—that reservoir, released slowly through magnetic dipole radiation, powers all the high-energy emission of the Crab Nebula. The binary pulsar PSR B1913+16, discovered in 1974, has an orbital period decay matching the general-relativistic prediction of gravitational-wave loss—the first quantitative evidence for gravitational waves.

## V. Black Holes

If even neutron degeneracy and nuclear forces fail, collapse proceeds without limit, forming a **black hole**. For an uncharged, non-rotating (Schwarzschild) black hole the event horizon radius is

$$R_s = \frac{2GM}{c^2} \approx 2.95\ \text{km}\left(\frac{M}{M_\odot}\right)$$

This can be "derived" by setting the Newtonian escape speed to $c$: $\sqrt{2GM/R} = c$ gives $R = 2GM/c^2$. Remarkably, this purely Newtonian estimate agrees exactly with the general-relativistic result.

Some intuitive numbers: if the Sun became a black hole, $R_s \approx 3\ \text{km}$; Earth about $8.9\ \text{mm}$; a stellar-mass black hole ($10 M_\odot$) about $30\ \text{km}$; the Galactic Centre black hole Sgr A* ($4.3\times 10^6 M_\odot$) about $1.3\times 10^7\ \text{km} \approx 0.085\ \text{AU}$; the M87 black hole ($6.5\times 10^9 M_\odot$) about $1.9\times 10^{10}\ \text{km}$, larger than the Solar System.

Black hole properties are summarized by the **no-hair theorem**: the external field is fixed by three parameters—mass $M$, angular momentum $J$ and charge $Q$; all other information (chemical composition, shape, field details) is lost in the collapse. The horizon is a one-way membrane: nothing entering, not even light, returns; for a distant observer, an infalling object's clock slows toward a halt and its light is infinitely redshifted. Inside there is a curvature singularity where classical general relativity breaks down.

Black holes are not absolutely black. Quantum field theory in curved spacetime shows that vacuum fluctuations near the horizon produce a thermal spectrum, **Hawking radiation**, with temperature

$$T_H = \frac{\hbar c^3}{8\pi G M k_B} \approx 6.2\times 10^{-8}\ \text{K}\left(\frac{M_\odot}{M}\right)$$

For a solar-mass black hole this is about $6\times 10^{-8}\ \text{K}$, far below the cosmic microwave background, so stellar-mass black holes currently absorb rather than evaporate. The evaporation timescale is about $10^{67}\ \text{yr}\,(M/M_\odot)^3$, fifty-eight orders of magnitude longer than the age of the Universe.

Observational evidence: X-ray binaries (such as Cygnus X-1, about $21 M_\odot$) reveal compact objects through accretion-disk emission; in 2015 LIGO detected gravitational waves from a binary black hole merger, GW150914 ($36 + 29 \to 62 M_\odot$, about $3 M_\odot$ converted to gravitational waves in 0.2 s with a peak power exceeding the electromagnetic output of the entire observable Universe); in 2019 the Event Horizon Telescope imaged the "shadow" of the M87 black hole, and in 2022 that of Sgr A*, with a diameter of about $52\ \mu\text{as}$, in excellent agreement with the predicted $2.6 R_s$ angular diameter.

## VI. Common Pitfalls

**Pitfall 1: black holes are cosmic vacuum cleaners.** At a distance a black hole's gravity is identical to that of any body of the same mass. If the Sun were replaced by a black hole of the same mass, Earth's orbit would not change—only the light and heat would vanish. The danger lies in getting too close.

**Pitfall 2: infall takes infinite time, so nothing ever falls in.** This confuses coordinate time with proper time. A distant observer indeed sees an asymptotically redshifted approach, but the free-falling body's own proper time to the horizon is a finite few microseconds to hours, and it passes straight through.

**Pitfall 3: a white dwarf is an ordinary star that is cooling.** It is a degenerate remnant with no nuclear burning, slowly cooling through its heat capacity toward an invisible black dwarf, and a million times denser than a normal star.

**Pitfall 4: the Chandrasekhar limit is exactly 1.4.** It depends on composition ($\mu_e$), rotation (rapidly rotating "super-Chandrasekhar" white dwarfs can exceed it slightly), temperature and magnetic field; 1.4 is a convenient value for carbon-oxygen white dwarfs.

**Pitfall 5: a neutron star is a uniform ball of neutrons.** The structure is complex: an iron crystal crust, then neutron-rich matter possibly with superfluid neutrons and superconducting protons, and a core that may host quark matter or "nuclear pasta".

## VII. Extensions

Compact-object research now binds astrophysics tightly to fundamental physics. GW170817, a binary neutron star merger seen in both gravitational and electromagnetic waves (gamma-ray burst, kilonova), showed that heavy elements such as gold and platinum come mainly from the rapid neutron-capture process in such mergers, gave an independent measurement of the Hubble constant, and constrained the speed of gravitational waves to within $10^{-15}$ of $c$, ruling out a large class of modified gravity theories.

Compact objects also provide laboratories for extreme physics: white dwarf degeneracy, neutron star equations of state, and strong-field tests of gravity with black holes—none reproducible on Earth. Looking back over the chapters, one thread is clear: gravity always wants matter to collapse, while quantum mechanics (degeneracy pressure) and nuclear physics (burning) keep supplying resistance; when each resistance fails in turn, gravity wins the final victory. The next chapter applies the same reasoning on larger scales: galaxies and the Universe itself.`,
  },

  'galaxy': {
    chapter: 'Chapter 6 Galaxies',
    title: 'The Milky Way and Dark Matter',
    summary:
      'Galaxies are the basic structural units of the Universe and the Hubble sequence describes their morphology; the flat rotation curves of spirals show that luminous matter is only a small part of the gravitating mass, making dark matter a pillar of modern cosmology.',
    keyPoints: [
      'The Hubble sequence classifies galaxies as ellipticals E0–E7, lenticulars S0, spirals Sa–Sc, barred spirals SBa–SBc and irregulars',
      'The Milky Way is a barred spiral; the Sun lies at $R_0 \\approx 8\\ \\text{kpc}$ and orbits at $v_0 \\approx 230\\ \\text{km/s}$, once every 220 million years',
      'Masses from $M(<r) = v^2r/G$: about $10^{11}M_\\odot$ inside the solar orbit and about $10^{12}M_\\odot$ in total',
      'Rotation curves stay flat outside instead of the Keplerian decline $v\\propto r^{-1/2}$, requiring a dark halo with $\\rho \\propto r^{-2}$',
      'Evidence for dark matter includes rotation curves, cluster mass-to-light ratios and hot gas, lensing (the Bullet Cluster), the CMB and large-scale structure',
      'Cosmic budget $\\Omega_b \\approx 0.049$, $\\Omega_c \\approx 0.265$, $\\Omega_\\Lambda \\approx 0.686$: baryons fall far short of the total matter density',
    ],
    content: String.raw`

In the early twentieth century whether the "spiral nebulae" were gas clouds inside the Milky Way or independent stellar systems was one of astronomy's greatest controversies. In 1925 Hubble used the Cepheid period–luminosity relation to place Andromeda at about 2.5 million light years, far beyond the Galaxy, ending the debate: the Universe consists of countless "island universes"—**galaxies**.

Hubble then arranged galaxies by morphology into the **Hubble sequence** (the tuning-fork diagram):

- **Ellipticals** E0–E7: no disk or arms, from round (E0) to flattened (E7), with index $n = 10(1 - b/a)$ from the axial ratio. They have almost no cold gas or young stars, and their stars move on random orbits.
- **Lenticulars** S0: a disk and bulge but no arms—a transition between spirals and ellipticals.
- **Spirals** Sa–Sb–Sc: bulges shrink, arms open, and gas and star formation increase along the sequence. The Milky Way is Sb/Sbc (with a bar, SBbc).
- **Barred spirals** SBa–SBc: a central bar drives gas inflow and triggers star formation.
- **Irregulars** Irr: no symmetry, usually gas-rich, often distorted by mergers or interactions.

Emphasize that the Hubble sequence **is not an evolutionary sequence**. Hubble guessed that galaxies evolve from $E$ to $S$, but the truth is the opposite: ellipticals often form from spiral mergers, are redder, and have exhausted their gas. Morphology is now seen as the outcome of formation history and environment (mergers, stripping, quenching).

Galaxy statistics are described by the **luminosity function**, with the Schechter form $\phi(L) \propto (L/L^*)^\alpha \exp(-L/L^*)$, $\alpha \approx -1.2$: faint dwarfs are numerous, bright galaxies rare. The characteristic luminosity $L^*$ corresponds to about $10^{10} L_\odot$ and a scale of tens of kpc.

## II. Structure and Parameters of the Milky Way

The Milky Way is a barred spiral with several components: the **bulge and bar** (2–3 kpc, rich in old stars and gas), the **thin disk** (active star formation, scale height about 300 pc, exponential scale length about 2.6 kpc, diameter about 30 kpc), the **thick disk** (scale height about 900 pc, old metal-poor stars), the **stellar halo and globular clusters** (nearly spherical, almost gas-free, very metal-poor), and the enveloping **dark halo** (extending beyond 200 kpc).

Key parameters: the Sun's distance from the Galactic Centre $R_0 \approx 8.2\ \text{kpc}$ (the GRAVITY interferometer's measurement of the S2 orbit gives $8178 \pm 13\ \text{pc}$) and the circular speed $v_0 \approx 230\ \text{km/s}$. The enclosed mass follows:

$$M(<R_0) = \frac{v_0^2 R_0}{G} \approx \frac{(2.3\times 10^5)^2 \times 8.2\times 3.086\times 10^{19}}{6.674\times 10^{-11}} \approx 2\times 10^{41}\ \text{kg} \approx 10^{11} M_\odot$$

The orbital period is

$$T = \frac{2\pi R_0}{v_0} \approx 2.2\times 10^8\ \text{yr}$$

a "Galactic year"; the Sun has completed about twenty circuits since its birth. The total stellar mass is about $5\times 10^{10} M_\odot$ while the total mass including the dark halo is about $10^{12} M_\odot$—luminous matter is only a few per cent.

## III. Rotation Curves and the Discovery of Dark Matter

The **rotation curve** is the most powerful diagnostic of a spiral: using the 21 cm line of neutral hydrogen (which extends beyond the optical radius) or Hα and CO lines, measure the circular speed $v(r)$ at various radii.

If a galaxy's mass were concentrated at the centre (as in the Solar System), Kepler's law would require $v \propto r^{-1/2}$ outside the luminous disk. Rubin, Ford and others in the 1970s and 1980s found something completely different: **rotation curves stay flat beyond the optical radius**, holding about 200–250 km/s out to tens of kpc.

Flatness means what? Circular balance $v^2/r = GM(<r)/r^2$ gives

$$M(<r) = \frac{v^2 r}{G}$$

If $v$ is constant then $M(<r) \propto r$: the enclosed mass grows linearly with radius, far exceeding all visible stars and gas. The corresponding density is

$$\rho(r) = \frac{1}{4\pi r^2}\frac{dM}{dr} = \frac{v^2}{4\pi G r^2} \propto r^{-2}$$

the classic **dark halo** profile (finer fits use the isothermal sphere or NFW profile, the latter with $\rho\propto r^{-1}$ inside and $\rho \propto r^{-3}$ outside). A spiral is therefore not a luminous disk of $10^{11} M_\odot$ but a disk embedded in a larger, more extended invisible halo. The Milky Way's halo has a virial mass about $10^{12} M_\odot$ and virial radius 200–300 kpc.

Dwarf galaxies offer more extreme cases. Some ultra-faint dwarfs have velocity dispersions of only a few km/s, yet the implied mass requires mass-to-light ratios of hundreds or thousands—the systems with the highest known dark matter fractions. Because baryonic feedback (supernovae blowing gas out) strongly alters their mass distribution, they are also natural laboratories for the particle nature of dark matter (cold, warm, self-interacting). Conversely, a few massive spirals show slightly declining outer rotation curves, showing that halo-baryon coupling is more complex than the simplest models—the "disk-halo degeneracy".

## IV. Multiple Lines of Evidence for Dark Matter

The dark matter hypothesis is accepted because several **independent** lines of evidence converge:

1. **Rotation curves**: outer speeds do not decline in spirals and dwarfs; dwarf spheroidal velocity dispersions imply $M/L \sim 100$ (in solar units $M/L_V = 1$), the cleanest dark matter laboratory.
2. **Clusters**: Zwicky's 1933 virial analysis of Coma found that the required mass was hundreds of times the luminous mass. Modern methods include X-ray observations of intracluster gas (gas at $10^7\sim 10^8\ \text{K}$ needs a potential well hundreds of times deeper than the visible mass to be retained).
3. **Gravitational lensing**: strong lensing Einstein ring radii give projected masses directly; weak lensing statistics map two-dimensional mass. The famous example is the **Bullet Cluster** (1E 0657-56): two clusters colliding head-on, with X-rays showing the hot gas lagging in the middle while the lensing mass peaks coincide with the collisionless galaxies, separate from the gas—the most damaging blow to modified-gravity alternatives.
4. **Cosmic microwave background**: the relative heights of the acoustic peaks are sensitive to baryon and total matter density, giving $\Omega_b h^2 \approx 0.022$ and $\Omega_c h^2 \approx 0.12$: baryons are about one sixth of the matter.
5. **Agreement of BBN and the CMB**: light-element abundances independently give $\Omega_b \approx 0.049$, consistent with the CMB but far below $\Omega_m \approx 0.31$.
6. **Large-scale structure**: simulations show that without cold dark matter, baryons coupled to radiation cannot build today's galaxies and filaments within 13.8 billion years.

Combining these, the cosmic energy budget is

$$\Omega_b \approx 0.049,\qquad \Omega_c \approx 0.265,\qquad \Omega_\Lambda \approx 0.686,\qquad \Omega_r \approx 9\times 10^{-5}$$

so all the atoms we know make up less than 5% of the Universe's energy.

## V. Empirical Scaling Relations of Galaxies

Besides rotation curves, several empirical relations serve both as distance indicators and as constraints on galaxy formation:

- **Tully–Fisher** (spirals): $L \propto v_{\max}^4$. Physically, if disk mass scales with halo virial mass and the mass-to-light ratio is roughly constant, the fourth-power scaling follows. Infrared bands or baryonic mass (the baryonic Tully–Fisher relation $M_b \propto v^4$) give tighter relations with very small scatter.
- **Faber–Jackson** (ellipticals): $L \propto \sigma^4$ with $\sigma$ the central velocity dispersion. Generalized to the **fundamental plane**: $R_e \propto \sigma^{1.24} I_e^{-0.82}$, a two-dimensional manifold linking effective radius, dispersion and surface brightness—the virial theorem at work in ellipticals.
- **Mass-to-light ratios**: $M/L_V \sim 1$–5 in the solar neighbourhood, $\sim 10$–100 for whole galaxies, and 300–500 for clusters. The systematic increase with scale is direct evidence for dark matter.
- **The M–$\sigma$ relation**: bulge velocity dispersion correlates tightly with central black hole mass, $M_{BH} \propto \sigma^{4\sim 5}$, indicating coevolution of black holes and galaxies.

Chemical evolution provides another independent thread: radial metallicity gradients and the mass–metallicity relation record the long competition between gas inflow, star formation and outflow, all within the potential well set by the dark halo. Deeper wells retain supernova ejecta more effectively, so they end up more metal-rich—the reason dwarfs are metal-poor and giants metal-rich.

## VI. Common Pitfalls

**Pitfall 1: dark matter is "black matter" or antimatter.** Dark matter does not interact electromagnetically, so it neither emits nor absorbs light—it is perfectly transparent, not black. It has nothing to do with antimatter (which annihilates with matter producing strong gamma rays).

**Pitfall 2: dark matter equals dark energy.** They are completely different: dark matter clumps, collapses gravitationally and drives galaxy and cluster formation; dark energy is uniform, has negative pressure and drives accelerated expansion.

**Pitfall 3: flat rotation curves can only be explained by modified gravity.** MOND can fit galaxy rotation curves but struggles to explain clusters, CMB acoustic peaks and the Bullet Cluster simultaneously. The mainstream picture remains cold dark matter plus dark energy (ΛCDM).

**Pitfall 4: the Milky Way's rotation is dominated by the central black hole.** The black hole has $4.3\times 10^6 M_\odot$, a few millionths of the total mass, and matters only within the innermost few parsecs; the solar orbit is governed by the whole mass distribution including the halo.

**Pitfall 5: all galaxies have dark halos.** A few dark-matter-deficient ultra-diffuse galaxies have been found (such as NGC 1052-DF2), probably stripped of their halos in mergers. Such counterexamples are valuable tests of the theory.

## VII. Extensions

The particle nature of dark matter remains unknown. The leading candidates are weakly interacting massive particles (WIMPs, GeV–TeV), but direct detection (XENON-nT, LZ, PandaX liquid-xenon time projection chambers) has found no confirmed signal and cross-section limits are now extraordinary; indirect searches (Fermi gamma rays, neutrino telescopes) and collider searches are also empty. Attention has turned to axions (ADMX), sterile neutrinos, primordial black holes and ultralight dark matter.

Theoretically, cold dark matter (CDM) explains large-scale structure from the CMB to surveys (SDSS, DESI) superbly, but faces small-scale challenges such as the cusp–core and missing-satellite problems, possibly resolved by warm or self-interacting dark matter or by baryonic feedback.

Finally, the solution need not involve a new particle. If dark matter is primordial black holes, it is ultimately a product of gravity and general relativity; if gravity departs from Newton at very low acceleration, the "missing mass" is really a "missing law of gravity". In the history of science, the anomaly in Uranus's orbit was resolved by finding Neptune, while Mercury's perihelion needed a new theory—which kind is dark matter? The answer may lie in joint data from the next generation of surveys (DESI, Euclid, the Vera Rubin Observatory) and underground detectors.

Methodologically the chapter reuses Chapter 1's tools: using Kepler's law (or the virial theorem) backwards—inferring the mass distribution from observed orbits rather than orbits from a known mass. This "gravity as a balance" runs through astrophysics: weighing planets, stars, galaxies and clusters, all the way to the Universe itself, which is the cosmology of the next chapter.`,
  },

  'cosmology': {
    chapter: 'Chapter 7 Cosmology',
    title: 'The Big Bang and the Expanding Universe',
    summary:
      'On large scales the Universe is homogeneous and isotropic and is expanding; Hubble\u2019s law gives the rate, the Friedmann equation ties the expansion history to the energy budget, and big-bang nucleosynthesis together with the cosmic microwave background established the hot big bang as the standard model.',
    keyPoints: [
      'Hubble\u2019s law $v = H_0 d$ with $H_0 \\approx 70\\ \\text{km}\\cdot\\text{s}^{-1}\\cdot\\text{Mpc}^{-1}$; Hubble time $1/H_0 \\approx 14$ Gyr',
      'Robertson–Walker metric $ds^2 = -c^2dt^2 + a^2(t)[dr^2/(1-kr^2) + r^2d\\Omega^2]$, with redshift $1+z = a_0/a(t)$',
      'Friedmann equation $\\left(\\dot a/a\\right)^2 = \\frac{8\\pi G}{3}\\rho - \\frac{kc^2}{a^2} + \\frac{\\Lambda c^2}{3}$',
      'The equation of state fixes dilution: matter $\\rho_m\\propto a^{-3}$, radiation $\\rho_r\\propto a^{-4}$, vacuum energy $\\rho_\\Lambda$ constant',
      'Critical density $\\rho_c = 3H^2/(8\\pi G) \\approx 9.2\\times 10^{-27}\\,\\text{kg/m}^3$; $\\Omega_{tot} \\approx 1$ means spatial flatness',
      'CMB temperature $T_0 = 2.725\\ \\text{K}$; last scattering at $z_* \\approx 1090$, $t \\approx 380{,}000$ yr, with fluctuations about $10^{-5}$',
    ],
    content: String.raw`

In 1929 Hubble combined Slipher's galaxy redshifts with his own distances and found a remarkably simple rule: recession velocity is proportional to distance,

$$v = H_0\,d$$

**Hubble's law**, with $H_0$ the Hubble constant. Today's best determinations show the famous "Hubble tension": early-Universe values from the CMB and baryon acoustic oscillations give about $67.4\ \text{km}\cdot\text{s}^{-1}\cdot\text{Mpc}^{-1}$ (Planck), while late-Universe local values from Cepheids and Type Ia supernovae give about $73\ \text{km}\cdot\text{s}^{-1}\cdot\text{Mpc}^{-1}$ (SH0ES), a discrepancy at $5\sigma$ that may hint at new physics or may come from unidentified systematics.

Redshift is defined as $z = (\lambda_{\text{obs}} - \lambda_0)/\lambda_0$. At small redshift it may be treated as a Doppler effect, $v \approx cz$, but on cosmological scales $z$ properly means a change of the **scale factor**:

$$1 + z = \frac{a_0}{a(t)}$$

Light is stretched by the expansion of space itself. Galaxies are not flying through space (their peculiar velocities are only hundreds of km/s); the metric is evolving.

The Hubble constant gives two useful scales. The Hubble time

$$t_H = \frac{1}{H_0} \approx \frac{3.086\times 10^{19}\ \text{km}}{70\ \text{km/s}} \approx 4.4\times 10^{17}\ \text{s} \approx 1.4\times 10^{10}\ \text{yr}$$

and the Hubble distance $c/H_0 \approx 4.3\ \text{Gpc} \approx 14$ billion light years. Interestingly the Hubble time is very close to the true age (13.8 Gyr), which in a simple matter-dominated model is not guaranteed—it is a coincidence of the present ΛCDM parameters.

A clarification: the $v$ in Hubble's law can be approximated by $cz$ only for $z \ll 1$; for $z \gtrsim 0.1$ the full redshift–distance relation, an integral over $\Omega_m$ and $\Omega_\Lambda$, is required. "Divide the redshift by $H_0$ to get a distance" is only the crudest first-order approximation, never used in precision cosmology; conversely, a systematic deviation from Hubble's law in some redshift range is itself a probe of the expansion history and the dark energy equation of state.

## II. The Cosmological Principle and the Robertson–Walker Metric

Cosmology becomes an exact science on two assumptions: the **cosmological principle**—on sufficiently large scales (above about 100 Mpc) the Universe is homogeneous and isotropic—and that gravity is described by general relativity. The first is supported by galaxy surveys (SDSS, DESI) and by the high-precision isotropy of the CMB.

The most general metric with homogeneity and isotropy is the **Robertson–Walker** (FLRW) metric:

$$ds^2 = -c^2dt^2 + a^2(t)\left[\frac{dr^2}{1 - kr^2} + r^2\left(d\theta^2 + \sin^2\theta\,d\varphi^2\right)\right]$$

where $a(t)$ is the **scale factor** (usually $a_0 = 1$ today) and $k = +1, 0, -1$ denote closed, flat and open universes. Here $r$ is a **comoving** coordinate expanding with the Universe, and the true proper distance is $d(t) = a(t) r$. Differentiating immediately gives Hubble's law:

$$v = \dot d = \dot a\, r = \frac{\dot a}{a}d = H(t)\,d$$

Hubble's law is thus not an extra assumption but a direct geometric consequence of uniform expansion; $H(t) = \dot a/a$ generally varies with time, and $H_0$ is only its present value.

Note also that the absolute normalization of $a(t)$ has no physical meaning (it can be rescaled if $r$ and $k$ are rescaled inversely); only ratios $a(t_1)/a(t_2)$ are observable. That is why redshift is expressed as $1+z = a_0/a(t)$ rather than by talking about "the size of the Universe": the total size is finite in the closed case and infinite in the flat and open cases, without affecting any local calculation.

## III. The Friedmann Equations

Substituting the FLRW metric into Einstein's field equations $G_{\mu\nu} + \Lambda g_{\mu\nu} = 8\pi G T_{\mu\nu}/c^4$, with matter as a perfect fluid (energy density $\rho c^2$, pressure $P$), gives two equations for the expansion:

**Friedmann equation (first order)**

$$\left(\frac{\dot a}{a}\right)^2 = \frac{8\pi G}{3}\rho - \frac{kc^2}{a^2} + \frac{\Lambda c^2}{3}$$

**Acceleration equation (second order)**

$$\frac{\ddot a}{a} = -\frac{4\pi G}{3}\left(\rho + \frac{3P}{c^2}\right) + \frac{\Lambda c^2}{3}$$

Together with energy conservation (the continuity equation)

$$\dot\rho + 3H\left(\rho + \frac{P}{c^2}\right) = 0$$

the dilution laws of the components follow directly:

- **Matter** ($P \approx 0$): $\rho_m \propto a^{-3}$—volume expansion with conserved particle number.
- **Radiation** ($P = \rho c^2/3$): $\rho_r \propto a^{-4}$—volume dilution plus the redshift of each photon's energy, one extra factor of $a^{-1}$.
- **Vacuum energy** ($P = -\rho c^2$): $\rho_\Lambda = \text{constant}$—the definition of the cosmological constant.

The acceleration equation reveals the surprise: pressure also gravitates. For ordinary matter and radiation $\rho + 3P/c^2 > 0$, gravity attracts and expansion **decelerates**; for vacuum energy $P = -\rho c^2$, so $\rho + 3P/c^2 = -2\rho < 0$, producing repulsion and **acceleration**.

## IV. Critical Density, Composition and Age

The **critical density** is the density required for flat space ($k = 0$):

$$\rho_c = \frac{3H^2}{8\pi G}$$

With $H_0 = 70\ \text{km}\cdot\text{s}^{-1}\cdot\text{Mpc}^{-1}$ (i.e. $2.27\times 10^{-18}\ \text{s}^{-1}$):

$$\rho_c \approx 9.2\times 10^{-27}\ \text{kg/m}^3 \approx 5.5\ \text{protons}/\text{m}^3$$

Writing the Friedmann equation with density parameters $\Omega_i = \rho_i/\rho_c$ gives

$$\Omega_m + \Omega_r + \Omega_\Lambda - 1 = \frac{kc^2}{a^2H^2}$$

so measuring the total $\Omega$ measures the spatial curvature. The positions of the CMB acoustic peaks give $\Omega_{\text{tot}} = 1.00 \pm 0.002$: the Universe is spatially flat to high precision. The components (Planck 2018) are

$$\Omega_b \approx 0.049,\quad \Omega_c \approx 0.265,\quad \Omega_\Lambda \approx 0.686,\quad \Omega_r \approx 9\times 10^{-5}$$

**The age** follows from an integral:

$$t_0 = \int_0^{1}\frac{da}{a\,H(a)},\qquad H(a) = H_0\sqrt{\Omega_m a^{-3} + \Omega_r a^{-4} + \Omega_\Lambda + (1-\Omega_{\text{tot}})a^{-2}}$$

In a purely matter-dominated Einstein–de Sitter model ($\Omega_m = 1$), $a \propto t^{2/3}$ and $t_0 = 2/(3H_0) \approx 9.2\ \text{Gyr}$—a serious crisis, since it is younger than the oldest globular clusters in the Galaxy. With a cosmological constant the early expansion is slower and takes longer to reach today's $H_0$, and the integral gives

$$t_0 \approx 13.8\ \text{Gyr}$$

consistent with the oldest stars, globular cluster turn-off ages and radioactive dating—one of the strongest successes of ΛCDM.

The expansion history has a key transition: radiation dominated before $z_{\text{eq}} \approx 3400$ (about 50,000 years); then matter dominated and structure grew; dark energy took over at $z \approx 0.6$–0.7 (about 5–6 Gyr ago), turning deceleration into acceleration. In 1998 two independent teams discovered this acceleration from Type Ia supernovae being fainter than expected, earning the 2011 Nobel Prize.

## V. The Cosmic Microwave Background

If the early Universe was hot and dense, then when it cooled enough for hydrogen atoms to form (recombination, $T \approx 3000\ \text{K}$) photons stopped being frequently scattered by free electrons and the Universe became transparent. Those "last scattering" photons still travel today, redshifted into microwaves—the **cosmic microwave background** (CMB). Gamow and others predicted its existence and temperature in the 1940s; Penzias and Wilson stumbled on it while testing an antenna in 1965, earning the 1978 Nobel Prize.

The FIRAS instrument on COBE measured in the 1990s a spectrum

$$T_0 = 2.7255 \pm 0.0006\ \text{K}$$

a **perfect blackbody** deviating from theory by less than five parts in $10^5$—the most perfect blackbody known in nature and ironclad evidence that the Universe was once in thermal equilibrium (the "hot big bang").

After subtracting the dipole anisotropy ($\Delta T \approx 3.36\ \text{mK}$, from the Solar System's motion at about 369 km/s relative to the CMB frame), the residual primordial fluctuations have amplitude only

$$\frac{\Delta T}{T} \sim 10^{-5}$$

tens of microkelvin. These tiny anisotropies are the seeds of all structure: in the primordial plasma baryons and photons oscillate acoustically, the fundamental angular scale placing the first acoustic peak at $l \approx 220$; the peak position measures the curvature ($\Omega_{\text{tot}}\approx 1$) and the relative peak heights give the baryon-to-dark-matter ratio. Last scattering occurs at $z_* \approx 1090$, when the Universe was about 380,000 years old.

The CMB also carries polarization. Thomson scattering in the primordial plasma generates linear polarization when a quadrupole anisotropy is present, decomposable into E modes (electric-like) and B modes (magnetic-like). E modes have been measured precisely by DASI, WMAP, Planck and others; their acoustic oscillations complement the temperature spectrum and independently constrain the reionization optical depth and cosmological parameters. **Primordial B modes** can only come from inflationary gravitational waves and are regarded as the "holy grail" of inflation tests. Current limits are $r < 0.03$ (BICEP/Keck with Planck), with no confirmed detection; the next generation (CMB-S4, LiteBIRD, Ali CMB) is pushing toward $r \sim 10^{-3}$.

## VI. Thermal History: from the Planck Era to Today

Standard cosmology gives a clear timeline:

- **Planck era** ($t < 10^{-43}\ \text{s}$, $T > 10^{32}\ \text{K}$): known physics fails; quantum gravity is required.
- **Inflation** (about $10^{-36}$–$10^{-32}\ \text{s}$): the scale factor grows exponentially by more than $e^{60}$, solving the horizon, flatness and monopole problems at a stroke and stretching quantum fluctuations into primordial density perturbations (a nearly scale-invariant spectrum with $n_s \approx 0.965$).
- **Reheating, hadron and lepton eras**: a quark–gluon plasma forms, then protons and neutrons; neutrinos decouple at about 1 s.
- **Big-bang nucleosynthesis (BBN)** (about 3 minutes, $T \approx 10^9\ \text{K}$): $^4$He, D, $^3$He and $^7$Li form, with predicted mass fraction $Y_p \approx 0.247$ and deuterium D/H $\approx 2.5\times 10^{-5}$, in excellent agreement with observation. This is the second pillar of the big bang independent of the CMB and directly fixes the baryon density.
- **Recombination and last scattering** (about 380,000 yr, $z\approx 1090$): neutral hydrogen forms and the CMB is released.
- **Dark ages and reionization** ($z \approx 6$–15): the first stars and quasars ionize the surrounding gas, a stage JWST is now observing directly.
- **Structure formation and acceleration**: dark matter halos collapse first, baryons fall in and form galaxies; dark energy dominates about 5 Gyr ago and expansion accelerates.

The **three pillars** of the big bang are Hubble expansion, the light-element abundances, and the CMB blackbody spectrum with its anisotropies. Any alternative theory must explain all three.

## VII. Common Pitfalls

**Pitfall 1: the big bang was an explosion at a point in space, with matter flying outward.** No: it is the **expansion of space itself**, happening everywhere at once, with no centre and no "outside". Galaxies see each other receding, not receding from an origin.

**Pitfall 2: distant galaxies recede faster than light, violating relativity.** They do not violate it. Special relativity forbids superluminal local motion; cosmological redshift comes from the growth of the scale factor, an accumulated effect of the metric that carries no local signal.

**Pitfall 3: an age of 13.8 Gyr with an observable radius of 46.5 Glyr is contradictory.** It is not. While light travels, the galaxy that emitted it keeps receding with the expansion, so the "present distance" far exceeds the light travel distance. The observable radius is a **proper distance** (about 46.5 Glyr), not a light-travel distance.

**Pitfall 4: the Hubble constant really is constant.** $H(t) = \dot a/a$ varies strongly with time (much larger early on); "constant" only means it is the same at all points at a given time.

**Pitfall 5: dark energy is simply Einstein's cosmological constant.** Observationally $w = P/\rho c^2$ is indeed close to $-1$ (currently $w = -1.03 \pm 0.03$), consistent with a cosmological constant, but its physical nature (vacuum energy? a dynamical field? modified gravity?) is unknown, and theoretical estimates of the vacuum energy density exceed the observed value by $10^{60}\sim 10^{120}$—one of the deepest unsolved problems in physics.

## VIII. Extensions

The standard ΛCDM model fits an enormous body of data from the CMB to large-scale structure with six parameters—the era of precision cosmology. But challenges remain: the Hubble tension, the $S_8$ tension (weak lensing finds slightly less structure growth than the CMB implies), the unknown nature of dark matter and dark energy, and the experimental test of inflation (primordial B modes remain undetected, $r < 0.03$).

Looking back over the whole course, from Newton's gravity in Chapter 1 to the Friedmann equation in Chapter 7, one logic runs throughout: **constrain the behaviour of a system with conservation laws and field equations, then use observations to infer parameters that cannot be measured directly**. Kepler's laws weigh the Sun and black holes, the virial theorem weighs clusters and dark halos, and the Friedmann equation weighs the energy budget and age of the Universe. That is the charm of astrophysics: from a handful of observables—a few images, a few spectral lines, a few numbers—it reconstructs a picture spanning tens of billions of years and tens of billions of light years. And 95% of that picture is still unknown, which is the task it leaves to the next generation.`,
  },
};

export default map;
