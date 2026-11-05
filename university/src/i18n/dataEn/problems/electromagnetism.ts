import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'electromagnetism-p1': {
    title: "Superposition of field strengths on the perpendicular bisector of two equal opposite charges",
    question: "A pair of point charges of opposite sign, each of magnitude $Q=2.0\\times10^{-8}\\ \\text{C}$, are separated by $d=4.0\\ \\text{cm}$ and form an electric dipole. Find the magnitude and direction of the electric field at the point $P$ on their perpendicular bisector, at a distance $r=3.0\\ \\text{cm}$ from the center. Take the vacuum permittivity $\\varepsilon_0=8.85\\times10^{-12}\\ \\text{C}^2/(\\text{N}\\cdot\\text{m}^2)$.",
    hints: [
      "Compute the electric field produced by each charge at $P$ separately, noting that the positive and negative charges give opposite directions.",
      "By symmetry the components along the line joining the charges cancel, while the perpendicular components add.",
      "For $r\\gg d$ the result should reduce to the dipole bisector formula $E=\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{p}{r^3}$.",
    ],
    solution: [
      {
        title: "Geometry",
        detail: "The midpoint $O$ is at a distance $a=d/2=0.020\\ \\text{m}$ from each charge; $P$ is at a distance $R=\\sqrt{r^2+a^2}=\\sqrt{0.03^2+0.02^2}=\\sqrt{0.0013}\\approx 0.03606\\ \\text{m}$ from each charge.",
      },
      {
        title: "Field magnitude of a single charge",
        detail: "$E_0=\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Q}{R^2}= (8.99\\times10^9)\\dfrac{2.0\\times10^{-8}}{0.0013}\\approx 1.383\\times10^5\\ \\text{N/C}$.",
      },
      {
        title: "Adding the components",
        detail: "The angle $\\theta$ between each field and the perpendicular bisector satisfies $\\cos\\theta = a/R = 0.02/0.03606\\approx 0.555$. The components along the line joining the charges cancel and the perpendicular components double: $E=2E_0\\cos\\theta \\approx 2\\times1.383\\times10^5\\times0.555 \\approx 1.535\\times10^5\\ \\text{N/C}$.",
      },
      {
        title: "Direction and check",
        detail: "The field points along the perpendicular bisector, from the side of the positive charge toward the side of the negative charge. The dipole formula $E=\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Qd}{(r^2+d^2/4)^{3/2}}$ gives the same value of about $1.54\\times10^5\\ \\text{N/C}$, in agreement.",
      },
    ],
    answer: "$E \\approx 1.54\\times10^5\\ \\text{N/C}$, directed along the perpendicular bisector from the side of the positive charge toward the side of the negative charge.",
    tags: ["electric field superposition", "electric dipole", "Coulomb law"],
  },
  'electromagnetism-p2': {
    title: "Electric field of a uniformly charged solid sphere",
    question: "A uniformly charged solid sphere of radius $R=0.10\\ \\text{m}$ carries a total charge $Q=1.0\\times10^{-8}\\ \\text{C}$ (with constant volume charge density $\\rho$). Find: (1) the electric field inside the sphere at $r_1=R/2$ from the center; (2) the electric field outside the sphere at $r_2=2R$ from the center. Take $\\dfrac{1}{4\\pi\\varepsilon_0}=8.99\\times10^9\\ \\text{N}\\cdot\\text{m}^2/\\text{C}^2$.",
    hints: [
      "Use spherical symmetry and take a concentric spherical Gaussian surface; find the field from Gauss law $\\oiint \\vec E\\cdot d\\vec S=Q_{\\text{enc}}/\\varepsilon_0$.",
      "The charge enclosed by an interior Gaussian surface follows the volume ratio $r^3/R^3$.",
      "Outside the sphere the field is that of a point charge, with all the charge concentrated at the center.",
    ],
    solution: [
      {
        title: "Field inside (Gauss law)",
        detail: "Take a concentric sphere of radius $r_1=R/2$; the enclosed charge is $Q_{\\text{enc}}=Q\\cdot (r_1^3/R^3)=Q/8=1.25\\times10^{-9}\\ \\text{C}$. From $E\\cdot 4\\pi r_1^2 = Q_{\\text{enc}}/\\varepsilon_0$ we get $E_1 = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Q}{R^3}r_1 = (8.99\\times10^9)\\dfrac{1.0\\times10^{-8}}{0.10^3}\\times0.05 \\approx 4.50\\times10^3\\ \\text{N/C}$.",
      },
      {
        title: "Field outside",
        detail: "Take a sphere of radius $r_2=2R=0.20\\ \\text{m}$, which encloses the whole charge $Q$, so $E_2 = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Q}{r_2^2} = (8.99\\times10^9)\\dfrac{1.0\\times10^{-8}}{0.20^2} \\approx 2.25\\times10^3\\ \\text{N/C}$.",
      },
      {
        title: "Direction",
        detail: "The configuration is spherically symmetric and the total charge is positive, so the field points radially outward. Inside it grows linearly with $r$, outside it decays as $1/r^2$, and the two match continuously at $r=R$ (the interior formula at $r=R$ gives $8.99\\times10^3$, and so does the exterior formula at the same point, $8.99\\times10^3\\ \\text{N/C}$).",
      },
    ],
    answer: "Inside at $r_1=R/2$, $E_1\\approx 4.50\\times10^3\\ \\text{N/C}$ (outward); outside at $r_2=2R$, $E_2\\approx 2.25\\times10^3\\ \\text{N/C}$ (outward).",
    tags: ["Gauss law", "spherical symmetry", "electric flux"],
  },
  'electromagnetism-p3': {
    title: "Potential and field on the axis of a uniformly charged ring",
    question: "A uniformly charged ring of radius $R=0.20\\ \\text{m}$ carries a total charge $Q=5.0\\times10^{-9}\\ \\text{C}$. Find the potential $\\varphi$ at the point $P$ on its axis at $x=0.15\\ \\text{m}$ from the center, and from it obtain the field strength there via $\\vec E=-\\nabla\\varphi$. Take $\\dfrac{1}{4\\pi\\varepsilon_0}=8.99\\times10^9\\ \\text{N}\\cdot\\text{m}^2/\\text{C}^2$.",
    hints: [
      "Every charge element of the ring is equidistant from $P$ on the axis, so the potential can be superposed as a scalar directly.",
      "Potential formula $\\varphi = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Q}{\\sqrt{R^2+x^2}}$.",
      "On the axis $\\vec E$ points along the axis with magnitude $E=-d\\varphi/dx$ (differentiate with respect to $x$).",
    ],
    solution: [
      {
        title: "Compute the distance",
        detail: "The distance from $P$ on the axis to any charge element of the ring is $r=\\sqrt{R^2+x^2}=\\sqrt{0.20^2+0.15^2}=\\sqrt{0.0625}=0.25\\ \\text{m}$.",
      },
      {
        title: "Superposing the potential",
        detail: "All charge elements contribute with the same sign at the same distance, so they add directly: $\\varphi = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Q}{r} = (8.99\\times10^9)\\dfrac{5.0\\times10^{-9}}{0.25} = 179.8\\ \\text{V}$.",
      },
      {
        title: "Field from the potential",
        detail: "$\\varphi(x)=\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Q}{\\sqrt{R^2+x^2}}$, and differentiating gives $E_x = -\\dfrac{d\\varphi}{dx} = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Qx}{(R^2+x^2)^{3/2}}$. Substituting $x=0.15$: $\\varphi' = (8.99\\times10^9)\\dfrac{5.0\\times10^{-9}\\times0.15}{(0.0625)^{3/2}} = (44.95)\\dfrac{0.15}{0.015625} = 431.5\\ \\text{N/C}$.",
      },
    ],
    answer: "$\\varphi \\approx 180\\ \\text{V}$; field strength $E\\approx 4.32\\times10^2\\ \\text{N/C}$, directed along the axis away from the ring (since $Q>0$).",
    tags: ["potential superposition", "field from the gradient", "electric potential"],
  },
  'electromagnetism-p4': {
    title: "A parallel-plate capacitor after a dielectric slab is inserted",
    question: "A parallel-plate capacitor has plate area $S=0.02\\ \\text{m}^2$ and plate separation $d=2.0\\ \\text{mm}$. It is first charged to $U=100\\ \\text{V}$ from a power supply and then disconnected, after which a uniform dielectric slab of thickness equal to the plate separation and relative permittivity $\\varepsilon_r=4$ is inserted between the plates. Find: (1) the electric field $E'$ between the plates after insertion; (2) the change $\\Delta W$ in the stored energy of the capacitor. Take $\\varepsilon_0=8.85\\times10^{-12}\\ \\text{F/m}$.",
    hints: [
      "After disconnection the plate charge $Q$ stays constant, and this is the premise for deciding how the quantities change.",
      "Inserting the dielectric changes the capacitance to $C'=\\varepsilon_r C$, and both the voltage and the field drop in the same proportion because $Q$ is fixed.",
      "Stored energy $W=Q^2/(2C)$: a larger capacitance means less stored energy.",
    ],
    solution: [
      {
        title: "Initial state",
        detail: "Initial capacitance $C=\\dfrac{\\varepsilon_0 S}{d}=\\dfrac{8.85\\times10^{-12}\\times0.02}{2.0\\times10^{-3}}=8.85\\times10^{-11}\\ \\text{F}=88.5\\ \\text{pF}$. Initial charge $Q=CU=8.85\\times10^{-11}\\times100=8.85\\times10^{-9}\\ \\text{C}$. Initial field $E=U/d=100/0.002=5.0\\times10^4\\ \\text{V/m}$.",
      },
      {
        title: "After insertion (Q fixed)",
        detail: "New capacitance $C'=\\varepsilon_r C=4C$. Since $Q$ is unchanged, the new voltage is $U'=Q/C'=U/4=25\\ \\text{V}$ and the new field is $E'=U'/d=E/4=1.25\\times10^4\\ \\text{V/m}$.",
      },
      {
        title: "Change in stored energy",
        detail: "Initial stored energy $W=\\dfrac12 CU^2=\\dfrac12\\times8.85\\times10^{-11}\\times10^4=4.425\\times10^{-7}\\ \\text{J}$. Final state $W'=Q^2/(2C')=W/4=1.106\\times10^{-7}\\ \\text{J}$. The change is $\\Delta W = W'-W = -3.32\\times10^{-7}\\ \\text{J}$ (the stored energy decreases, the difference going into the polarization energy of the dielectric).",
      },
    ],
    answer: "After insertion $E'=1.25\\times10^4\\ \\text{V/m}$; the stored energy decreases by $\\Delta W=-3.32\\times10^{-7}\\ \\text{J}$.",
    tags: ["capacitor", "dielectric", "permittivity"],
  },
  'electromagnetism-p5': {
    title: "Kirchhoff solution of a series-parallel circuit with sources",
    question: "The circuit is as follows: two sources with EMF $\\mathscr E_1=12\\ \\text{V}$ (internal resistance $r_1=1\\ \\Omega$) and $\\mathscr E_2=6\\ \\text{V}$ (internal resistance $r_2=0.5\\ \\Omega$), together with external resistors $R_1=4\\ \\Omega$ and $R_2=6\\ \\Omega$, form a single loop, and $\\mathscr E_1,\\mathscr E_2$ are in series aiding each other. Find: (1) the loop current $I$; (2) the voltage $U_1$ across $R_1$; (3) the terminal voltage $U_{\\text{term},1}$ of source $\\mathscr E_1$.",
    hints: [
      "First write the loop voltage equation (KVL) along a chosen direction: the algebraic sum of the EMFs equals the algebraic sum of the resistive drops.",
      "Sources in series aiding add their EMFs, and all internal and external resistances simply add in series.",
      "Terminal voltage $U_{\\text{term}}=\\mathscr E-Ir$ (while discharging).",
    ],
    solution: [
      {
        title: "Write the KVL equation",
        detail: "Take the current direction as positive around the loop; the EMFs add in the same direction and the resistances add in series: $R_{\\text{tot}}=r_1+r_2+R_1+R_2=1+0.5+4+6=11.5\\ \\Omega$. Total EMF $\\mathscr E_{\\text{tot}}=12+6=18\\ \\text{V}$. Hence $I=\\dfrac{\\mathscr E_{\\text{tot}}}{R_{\\text{tot}}}=\\dfrac{18}{11.5}\\approx 1.565\\ \\text{A}$.",
      },
      {
        title: "Find $U_1$",
        detail: "Voltage across $R_1$: $U_1=I R_1 = 1.565\\times4 \\approx 6.26\\ \\text{V}$.",
      },
      {
        title: "Find the terminal voltage of $\\mathscr E_1$",
        detail: "While discharging, the terminal voltage is $U_{\\text{term},1}=\\mathscr E_1 - I r_1 = 12 - 1.565\\times1 = 10.435\\ \\text{V}$. This can be cross-checked with the loop relation $U_{\\text{term},1}=IR_1+IR_2+U_{\\text{term},2}$.",
      },
    ],
    answer: "$I\\approx 1.57\\ \\text{A}$; $U_1\\approx 6.26\\ \\text{V}$; $U_{\\text{term},1}\\approx 10.4\\ \\text{V}$.",
    tags: ["Kirchhoff laws", "circuit with sources", "Ohm law"],
  },
  'electromagnetism-p6': {
    title: "Magnetic field and Lorentz force for a long straight wire combined with a loop",
    question: "An infinitely long straight wire carries a current $I_1=10\\ \\text{A}$ (along the $z$ axis). Next to it, at a distance $a=0.05\\ \\text{m}$ from the wire, a circular loop of radius $R=0.03\\ \\text{m}$ is placed, with its plane perpendicular to the wire and its center on one side of the wire. The loop carries a current $I_2=2\\ \\text{A}$. Find: (1) the magnetic flux density $B$ produced by the straight wire at the center of the loop; (2) the magnitude of the Lorentz force on a proton moving radially outward in the plane of the loop with speed $v=10^5\\ \\text{m/s}$ when it is at the center. Take $\\mu_0=4\\pi\\times10^{-7}\\ \\text{T}\\cdot\\text{m/A}$, $e=1.6\\times10^{-19}\\ \\text{C}$.",
    hints: [
      "The field of an infinitely long straight wire is $B=\\mu_0 I/(2\\pi r)$, with the direction given by the right-hand rule.",
      "The distance from the center of the loop to the wire is just $a$; substitute it directly.",
      "Lorentz force $F=qvB\\sin\\theta$; pay attention to the angle between the velocity and the field.",
    ],
    solution: [
      {
        title: "Field of the straight wire at the center",
        detail: "$B=\\dfrac{\\mu_0 I_1}{2\\pi a}=\\dfrac{4\\pi\\times10^{-7}\\times10}{2\\pi\\times0.05}= \\dfrac{4\\times10^{-6}}{0.10}=4.0\\times10^{-5}\\ \\text{T}$. It is perpendicular to the plane of the loop (by the right-hand rule: with the wire current upward and the center on the right of the wire, the field points into the page).",
      },
      {
        title: "Force analysis for the proton",
        detail: "The proton moves radially outward (within the plane of the loop), so its velocity $\\vec v$ lies in the plane of the loop, while $\\vec B$ is perpendicular to that plane; hence $\\vec v\\perp\\vec B$ and $\\sin\\theta=1$.",
      },
      {
        title: "Magnitude of the Lorentz force",
        detail: "$F=e v B = 1.6\\times10^{-19}\\times10^5\\times4.0\\times10^{-5} = 6.4\\times10^{-19}\\ \\text{N}$. The direction is fixed by $\\vec v\\times\\vec B$ (right-hand rule): within the plane of the loop, perpendicular to the velocity.",
      },
    ],
    answer: "At the center $B=4.0\\times10^{-5}\\ \\text{T}$ (perpendicular to the plane of the loop); the Lorentz force on the proton is $F=6.4\\times10^{-19}\\ \\text{N}$.",
    tags: ["Ampere circuital theorem", "Lorentz force", "Biot-Savart"],
  },
  'electromagnetism-p7': {
    title: "EMF, external power and Joule heat for a rod cutting magnetic field lines",
    question: "Two horizontal parallel metal rails are separated by $L=0.40\\ \\text{m}$ and joined at the left end by a resistor $R=2.5\\ \\Omega$; a conducting rod that can slide without friction (its own resistance neglected) rests across the right portion, and a uniform magnetic field $B=0.50\\ \\text{T}$ points out of the page throughout the region. An external force now makes the rod slide to the right at constant speed $v=2.5\\ \\text{m/s}$. Find: (1) the induced EMF $\\mathscr E$ in the circuit and the magnitude of the current $I$, and use Lenz law to determine the direction of the current in the rod; (2) the horizontal external force needed to keep the speed constant and the power it delivers; (3) the Joule heat $Q$ generated in the circuit during $t=4.0\\ \\text{s}$, and verify that the mechanical power equals the Joule heating power.",
    hints: [
      "As the rod slides right the circuit area grows, so the outward magnetic flux through the circuit increases; by Lenz law the field of the induced current must point into the page.",
      "The motional EMF is directly $\\mathscr E = \\dfrac{d\\Phi}{dt}=BLv$, and the current follows from Ohm law for the closed circuit, $I=\\mathscr E/R$.",
      "At constant speed the external force balances the Ampere force: $F_{\\text{ext}}=BIL$; its power $P=F_{\\text{ext}}v$ should equal $I^2R$ exactly.",
    ],
    solution: [
      {
        title: "Rate of flux change and induced EMF",
        detail: "Suppose the rod moves a distance $\\Delta x=v\\Delta t$ to the right during $\\Delta t$; the circuit area grows by $\\Delta S=L\\cdot v\\Delta t$ and the flux through the circuit increases by $\\Delta\\Phi=B\\Delta S=BLv\\Delta t$. By Faraday law\\n\\n$$\\mathscr E=\\left|\\frac{d\\Phi}{dt}\\right|=BLv=0.50\\times0.40\\times2.5=0.50\\ \\text{V}$$\\n\\nEquivalently, the motional EMF formula $\\mathscr E=\\int(\\vec v\\times\\vec B)\\cdot d\\vec l = BLv$ gives the same result. The circuit current is\\n\\n$$I=\\frac{\\mathscr E}{R}=\\frac{0.50}{2.5}=0.20\\ \\text{A}$$",
      },
      {
        title: "Current direction (Lenz law)",
        detail: "As the rod moves right the circuit area grows and the “outward flux” through the circuit increases. By Lenz law the field produced by the induced current must oppose this increase, so the induced field points into the page. By the right-hand screw rule the current in the circuit runs clockwise (viewed from above), i.e. in the rod it flows from the upper rail down to the lower rail. The motional EMF in the rod can be checked with the direction of $\\vec v\\times\\vec B$: $\\vec v$ points right and $\\vec B$ out of the page, so $\\vec v\\times\\vec B$ points down along the rod, consistent with the conclusion above.",
      },
      {
        title: "External force and power at constant speed",
        detail: "A current-carrying rod in a magnetic field feels an Ampere force; since the rod is perpendicular to the field, its magnitude is\\n\\n$$F_B=BIL=0.50\\times0.20\\times0.40=0.040\\ \\text{N}$$\\n\\nBy the left-hand rule (or by the Lenz law statement that the effect opposes the relative motion) this force points horizontally to the left, opposite to the motion. To keep the speed constant the external force must be equal and opposite:\\n\\n$$F_{\\text{ext}}=0.040\\ \\text{N}\\ (\\text{to the right})$$\\n\\nThe power delivered by the external force is\\n\\n$$P_{\\text{ext}}=F_{\\text{ext}}v=0.040\\times2.5=0.10\\ \\text{W}$$",
      },
      {
        title: "Joule heat and the energy balance check",
        detail: "The Joule heating power of the circuit is\\n\\n$$P_R=I^2R=(0.20)^2\\times2.5=0.10\\ \\text{W}$$\\n\\nThis can also be checked with $P_R=\\mathscr E^2/R=(0.50)^2/2.5=0.10\\ \\text{W}$. Thus $P_{\\text{ext}}=P_R=0.10\\ \\text{W}$: all the mechanical work done by the external force is converted into Joule heat, so energy is conserved. During $t=4.0\\ \\text{s}$\\n\\n$$Q=P_R\\,t=0.10\\times4.0=0.40\\ \\text{J}$$\\n\\nIn the same interval the rod sweeps a distance $x=vt=10\\ \\text{m}$ and the external work is $F_{\\text{ext}}x=0.040\\times10=0.40\\ \\text{J}$, equal to the Joule heat, which confirms the result once more.",
      },
    ],
    answer: "(1) $\\mathscr E=0.50\\ \\text{V}$, $I=0.20\\ \\text{A}$, the current in the rod runs from top to bottom (the circuit current is clockwise); (2) the horizontal external force is $F_{\\text{ext}}=4.0\\times10^{-2}\\ \\text{N}$ (to the right) with power $P_{\\text{ext}}=0.10\\ \\text{W}$; (3) the Joule heat in $4.0\\ \\text{s}$ is $Q=0.40\\ \\text{J}$, and $P_{\\text{ext}}=P_R=0.10\\ \\text{W}$, so all the mechanical energy becomes Joule heat.",
    tags: ["Faraday law", "motional EMF", "Lenz law", "energy conservation"],
  },
};

export default map;
