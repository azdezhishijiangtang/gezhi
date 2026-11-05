import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'vector-algebra': {
    chapter: 'Chapter 1 Vector Algebra',
    title: 'Vector Algebra and Spatial Coordinates',
    summary:
      'Each of the three products has its own job: the scalar product measures length and projection, the vector product builds a normal, the mixed product computes volume—the bedrock of spatial analytic geometry.',
    keyPoints: [
      'Dot product reads the angle, cross product builds a normal, mixed product gives the volume',
      'Coordinates of a×b form a 3×3 determinant; expanding along the first row is safest',
      'Coplanar ⟺ mixed product is 0; volume = |mixed product|',
      'Expansion of a×(b×c): the middle vector times the dot products of the outer two, subtracted',
    ],
    content: String.raw`

Forces, velocities and displacements in physics do not have only a "magnitude": pushing 5 newtons east and 5 newtons north have completely different effects. One number cannot describe them; you must record both magnitude and direction. Mathematics therefore introduces vectors—quantities with both magnitude and direction, such as the directed segment from a start point to an end point. Vectors connect the "arrow" of geometry with the "array" of algebra: one arrow corresponds to one triple of coordinates $(a_1,a_2,a_3)$.

But addition and subtraction alone are not enough. Two forces combine by the parallelogram law (vector addition); so what should "multiplying two vectors" mean? The question has no unique answer, because different questions are being asked: "how much work does a force do along the direction of motion" asks for a projected length, which is the scalar product; "what is the area of the parallelogram spanned by two rods", or "build a normal perpendicular to both", is the vector product; "what is the volume of the parallelepiped spanned by three vectors", or "are they coplanar", is the mixed product. Three products, three jobs—this is the vocabulary of the whole subject.

## II. Formal Definition

**Vectors and coordinates**: let $\vec{a} = (a_1,a_2,a_3)$, $\vec{b} = (b_1,b_2,b_3)$.

$$\vec{a} + \vec{b} = (a_1+b_1,\ a_2+b_2,\ a_3+b_3), \qquad \lambda\vec{a} = (\lambda a_1,\ \lambda a_2,\ \lambda a_3)$$

Magnitude:

$$|\vec{a}| = \sqrt{a_1^2+a_2^2+a_3^2}$$

Direction cosines: if $\vec{a}$ makes angles $\alpha,\beta,\gamma$ with the three coordinate axes, then $\cos\alpha = \dfrac{a_1}{|\vec{a}|}$ and so on, and

$$\cos^2\alpha + \cos^2\beta + \cos^2\gamma = 1$$

**Definition 1 (scalar / dot product)**:

$$\vec{a}\cdot\vec{b} = |\vec{a}|\,|\vec{b}|\cos\theta = a_1b_1 + a_2b_2 + a_3b_3$$

where $\theta$ is the angle between the two vectors.

**Definition 2 (vector / cross product)**: the result is a vector of magnitude $|\vec{a}\times\vec{b}| = |\vec{a}||\vec{b}|\sin\theta$ (the area of the parallelogram with sides $\vec{a},\vec{b}$), with direction given by the right-hand rule, perpendicular to the plane of $\vec{a},\vec{b}$:

$$\vec{a}\times\vec{b} = \begin{vmatrix} \vec{i} & \vec{j} & \vec{k} \\ a_1 & a_2 & a_3 \\ b_1 & b_2 & b_3 \end{vmatrix}$$

It is anticommutative: $\vec{a}\times\vec{b} = -\vec{b}\times\vec{a}$.

**Definition 3 (mixed product)**:

$$(\vec{a},\vec{b},\vec{c}) = (\vec{a}\times\vec{b})\cdot\vec{c} = \begin{vmatrix} a_1 & a_2 & a_3 \\ b_1 & b_2 & b_3 \\ c_1 & c_2 & c_3 \end{vmatrix}$$

Its absolute value is the volume of the parallelepiped with the three vectors as edges; the three vectors are coplanar $\iff$ the mixed product is 0.

**Useful identity**:

$$\vec{a}\times(\vec{b}\times\vec{c}) = (\vec{a}\cdot\vec{c})\vec{b} - (\vec{a}\cdot\vec{b})\vec{c}$$

## III. Why Define It This Way

**Why does the scalar product carry $\cos\theta$?** Work = force $\times$ the projection of displacement onto the force direction, and that projected length is exactly $|\vec{b}|\cos\theta$, hence the cosine. When $\theta=90^\circ$ the dot product is 0—perpendicular vectors "contribute nothing to each other", which is precisely the algebraic test for perpendicularity.

**Why is the vector product a vector rather than a number?** Because it must encode both the size of the area and the direction normal to its plane. Given only an area (a number) you do not know which way the surface faces; the vector $\vec{n} = \vec{a}\times\vec{b}$ gives the area $|\vec{n}|$ and the normal $\vec{n}/|\vec{n}|$ at once. The right-hand rule fixes a unique direction and removes ambiguity.

**Why does the mixed product equal the volume?** First compute $\vec{a}\times\vec{b}$ to get the base-area vector (perpendicular to the base), then take the dot product with $\vec{c}$: this multiplies the projected length of $\vec{c}$ on the base normal by the base area—exactly the volume of the parallelepiped. The geometric meaning of a determinant is precisely "signed volume".

**Counterexample (the condition cannot be dropped)**: if three vectors are coplanar they span no solid, so the mixed product must be 0; conversely a zero mixed product forces coplanarity. This is a necessary and sufficient condition, not an approximation.

## IV. Intuition and Pictures

**Parallelogram and triangle rules for addition**: place two arrows head to tail, and the arrow from start to finish is the sum; or draw both from a common point, complete the parallelogram, and the diagonal is the sum.

**Picture of the scalar product**: project $\vec{b}$ onto the direction of $\vec{a}$ and multiply the projected length by $|\vec{a}|$. An acute angle gives a positive dot product, an obtuse angle a negative one, a right angle zero.

**Picture of the vector product**: curl the four fingers of the right hand from $\vec{a}$ toward $\vec{b}$; the thumb points along $\vec{a}\times\vec{b}$, whose length is the area of the parallelogram they span—like the size of a slanted carpet.

**Picture of the mixed product**: treat the three vectors as the three edges of a box; the absolute value of the mixed product is its volume, and the sign is fixed by the orientation (right- or left-handed).

**Determinant expansion worth memorizing**: expanding the cross product along the first row is safest: $\vec{i}(a_2b_3-a_3b_2) - \vec{j}(a_1b_3-a_3b_1) + \vec{k}(a_1b_2-a_2b_1)$.

## V. Worked Examples

### Example 1 (basic: angle from the scalar product)

Problem: given $\vec{a} = (1,2,2)$, $\vec{b} = (2,1,0)$, find the angle between them.

Analysis: use $\cos\theta = \dfrac{\vec{a}\cdot\vec{b}}{|\vec{a}||\vec{b}|}$.

Solution: $\vec{a}\cdot\vec{b} = 1\cdot 2 + 2\cdot 1 + 2\cdot 0 = 4$, $|\vec{a}| = \sqrt{1+4+4}=3$, $|\vec{b}| = \sqrt{4+1}= \sqrt{5}$. Hence

$$\cos\theta = \frac{4}{3\sqrt{5}} = \frac{4\sqrt{5}}{15}, \qquad \theta = \arccos\frac{4\sqrt{5}}{15}$$

Comment: perpendicularity is decided only by whether the dot product vanishes; here it does not, so the vectors are not perpendicular.

### Example 2 (intermediate: area from the vector product)

Problem: find the area of the triangle with vertices $A(1,0,0)$, $B(0,1,0)$, $C(0,0,1)$.

Analysis: the triangle is half the parallelogram on $\overrightarrow{AB},\overrightarrow{AC}$, so area $= \dfrac{1}{2}|\overrightarrow{AB}\times\overrightarrow{AC}|$.

Solution: $\overrightarrow{AB} = (-1,1,0)$, $\overrightarrow{AC} = (-1,0,1)$.

$$\overrightarrow{AB}\times\overrightarrow{AC} = \begin{vmatrix} \vec{i} & \vec{j} & \vec{k} \\ -1 & 1 & 0 \\ -1 & 0 & 1 \end{vmatrix} = (1,\ 1,\ 1)$$

So $S = \dfrac{1}{2}\sqrt{1+1+1} = \dfrac{\sqrt{3}}{2}$.

Comment: the cross product turns "find an area" into "compute one cross product and take half its norm"—more general than base times height, especially for triangles in space.

### Example 3 (advanced: coplanarity by mixed product)

Problem: decide whether the four points $O(0,0,0)$, $A(1,1,0)$, $B(2,0,1)$, $C(3,1,2)$ are coplanar.

Analysis: four points are coplanar $\iff$ the three vectors $\overrightarrow{OA},\overrightarrow{OB},\overrightarrow{OC}$ are coplanar $\iff$ the mixed product is 0.

Solution: $\overrightarrow{OA}=(1,1,0)$, $\overrightarrow{OB}=(2,0,1)$, $\overrightarrow{OC}=(3,1,2)$. The mixed product is

$$(\overrightarrow{OA},\overrightarrow{OB},\overrightarrow{OC}) = \begin{vmatrix} 1 & 1 & 0 \\ 2 & 0 & 1 \\ 3 & 1 & 2 \end{vmatrix} = 1(0\cdot 2-1\cdot 1) - 1(2\cdot 2-1\cdot 3) + 0 = -1 - (4-3) = -2 \neq 0$$

so the four points are not coplanar; they span a tetrahedron.

Comment: a nonzero mixed product says the three vectors "open up" three-dimensional space; a zero one would put all four points on one plane.

### Example 4 (supplementary: using the vector identity)

Problem: describe the structure of $(\vec{a}\times\vec{b})\cdot(\vec{a}\times\vec{b})$ and $\vec{a}\times(\vec{b}\times\vec{c})$.

Analysis: the first is the squared norm of the cross product $ = |\vec{a}|^2|\vec{b}|^2 - (\vec{a}\cdot\vec{b})^2$ (Lagrange's identity); the second is expanded by the identity.

Solution: from $\vec{a}\times(\vec{b}\times\vec{c}) = (\vec{a}\cdot\vec{c})\vec{b} - (\vec{a}\cdot\vec{b})\vec{c}$ one sees that a "cross product inside a cross product" collapses to a linear combination of $\vec{b},\vec{c}$ with no cross product left. This identity appears constantly in mechanics (angular momentum, rigid-body rotation).

Comment: nested cross products cannot be expanded naively; apply the identity—"middle vector times the dot products of the outer two, subtracted".

## VI. Common Mistakes

1. **Treating the dot product as a vector**: $\vec{a}\cdot\vec{b}$ is a number (scalar), not a vector; only the cross product yields a vector.
2. **Reversing the order of the cross product**: $\vec{a}\times\vec{b} = -\vec{b}\times\vec{a}$; swapping the order flips the sign and reverses the direction.
3. **Wrong signs in the determinant expansion**: expanding along the first row puts a minus sign before $\vec{j}$; dropping it points the whole vector the wrong way.
4. **Using the mixed product as a volume without the absolute value**: the mixed product can be positive or negative (orientation); the volume is its absolute value.
5. **Wrong angle range**: in the dot-product formula $\theta\in[0,\pi]$; do not use $[0,2\pi)$, which scrambles the sign of $\cos$.
6. **Confusing collinearity with coplanarity**: two vectors are always coplanar; three points are always coplanar; only "four points coplanar" needs the mixed product.

## VII. Summary and Mnemonic

Recap:
- Vector = magnitude + direction = a triple of coordinates; addition and scalar multiplication act componentwise.
- The scalar (dot) product is a scalar; it measures lengths and projections, and perpendicularity is decided by a zero dot product.
- The vector (cross) product is a vector; it builds normals and measures areas, and the anticommutative law must not be forgotten.
- The mixed product is a scalar; its absolute value is the parallelepiped volume, and coplanarity holds exactly when it vanishes.
- These three products are the algebraic language of spatial geometry; planes, lines and surfaces all rest on them.

Mnemonic: **"Dot product is a number that reads projections; cross product builds a normal, mind the flip; mixed product fixes volume, and zero means coplanar."**`,
  },

  'plane-line': {
    chapter: 'Chapter 2 Planes and Lines',
    title: 'Planes and Lines in Space',
    summary:
      'One normal vector fixes a plane, one direction vector fixes a line—translate geometry into algebraic equations, then translate back.',
    keyPoints: [
      "A plane's normal vector sits in the coefficients; a line's direction vector sits in the denominators",
      'Line-plane angle uses the sine: sinφ = |s·n|/(|s||n|)',
      'The pencil-of-planes equation is the standard tool for "through a given line" problems',
      'Distance between skew lines = mixed product divided by the cross-product norm',
    ],
    content: String.raw`

In plane analytic geometry a line is completely determined by one equation $Ax+By+C=0$; in space things get harder at once: one equation $Ax+By+Cz+D=0$ is no longer a line but a whole plane—one constraint fewer, so the solution set is two-dimensional. How then to represent a line in space? A line needs a direction to stretch along and a point to pin it down. Here the central idea of spatial geometry appears: use vectors as the skeleton—one normal vector fixes a plane, one direction vector fixes a line—translate geometric relations into algebraic systems, solve, then translate back into geometry. This chapter lays down that "translation technique".

## II. Formal Definition

**Point-normal form of a plane**: through $M_0(x_0,y_0,z_0)$ with normal $\vec{n}=(A,B,C)$:

$$A(x-x_0) + B(y-y_0) + C(z-z_0) = 0$$

**General form**: $Ax+By+Cz+D=0$, whose normal vector is the coefficient triple $(A,B,C)$.

**Intercept form**: $\dfrac{x}{a}+\dfrac{y}{b}+\dfrac{z}{c}=1$, for planes not through the origin and not parallel to a coordinate axis.

**Three-point form**: the plane through $M_1,M_2,M_3$ satisfies

$$\begin{vmatrix} x-x_1 & y-y_1 & z-z_1 \\ x_2-x_1 & y_2-y_1 & z_2-z_1 \\ x_3-x_1 & y_3-y_1 & z_3-z_1 \end{vmatrix} = 0$$

**Symmetric (standard) form of a line**: through $M_0$ with direction $\vec{s}=(m,n,p)$:

$$\frac{x-x_0}{m} = \frac{y-y_0}{n} = \frac{z-z_0}{p}$$

**Parametric form**:

$$\begin{cases} x = x_0 + mt \\ y = y_0 + nt \\ z = z_0 + pt \end{cases}$$

**General form**: two plane equations taken together represent their intersection line.

**Distances and angles**:
- Point to plane: $d = \dfrac{|Ax_0+By_0+Cz_0+D|}{\sqrt{A^2+B^2+C^2}}$.
- Point to line: $d = \dfrac{|\overrightarrow{M_0M}\times\vec{s}|}{|\vec{s}|}$.
- Angle between two planes (acute): $\cos\theta = \dfrac{|\vec{n}_1\cdot\vec{n}_2|}{|\vec{n}_1||\vec{n}_2|}$.
- Line-plane angle $\varphi$: $\sin\varphi = \dfrac{|\vec{s}\cdot\vec{n}|}{|\vec{s}||\vec{n}|}$ (a sine!).
- Distance between skew lines: $d = \dfrac{|(\overrightarrow{M_1M_2},\vec{s}_1,\vec{s}_2)|}{|\vec{s}_1\times\vec{s}_2|}$.

## III. Why Define It This Way

**Why does a normal vector determine a plane?** Every vector in the plane is perpendicular to the normal (dot product 0), and the point-normal form simply writes "$(x,y,z)$ joined to the fixed point $\perp \vec{n}$" as an equation. The normal gives the plane its orientation, the fixed point gives its position; together they determine it uniquely.

**Why does a line use a direction vector rather than a normal?** Infinitely many vectors in space are perpendicular to a given line (they fill a plane), so no single one determines the line; but the direction along the line is unique up to a scalar, so the direction vector captures the "heading" of the line.

**Why does the line-plane angle use a sine?** The angle between a line and a plane is defined as the angle between the line and its projection on the plane, which is the complement of the angle between the direction and the normal. Thus $\varphi = 90^\circ - \angle(\vec{s},\vec{n})$, and $\sin\varphi = \cos\angle(\vec{s},\vec{n}) = \dfrac{|\vec{s}\cdot\vec{n}|}{|\vec{s}||\vec{n}|}$. Using a cosine gives the complement instead.

**Why is skew-line distance the mixed product over the cross-product norm?** The common perpendicular points along $\vec{s}_1\times\vec{s}_2$; projecting the joining segment $\overrightarrow{M_1M_2}$ onto that direction gives the shortest distance, and the numerator is exactly the absolute mixed product.

**Counterexample (the condition cannot be dropped)**: the symmetric form requires each component of the direction vector to be nonzero; if a component vanishes (say $m=0$), you may not write $\dfrac{x-x_0}{0}$ but must split it into $x=x_0$ together with the other two equations, otherwise the zero denominator is meaningless.

## IV. Intuition and Pictures

**Picture of a plane**: the normal vector is a flagpole standing straight out of the plane; the coefficients of the general form are that pole's direction.

**Picture of a line**: the three fractions of the symmetric form are all equal to a common parameter $t$; the parametric form is handiest for "walking along the line".

**Pencil of planes**: all planes through a fixed line form a family parametrized by $\pi_1 + \lambda\pi_2 = 0$, a sharp tool for "through a known line" problems.

**Skew lines**: two lines that never meet and are not parallel (like the two decks of an overpass); their shortest joining segment is perpendicular to both.

**Quick reference for angles**:
| Objects | Angle formula | Note |
|---------|---------------|------|
| Two planes | Cosine of the normals' angle | Take the acute angle |
| Two lines | Cosine of the directions' angle | Take the acute angle |
| Line and plane | Sine (direction · normal) | Not cosine |

## V. Worked Examples

### Example 1 (basic: plane from point-normal form)

Problem: find the plane through $(1,2,3)$ perpendicular to the vector $(2,-1,1)$.

Analysis: the perpendicular vector is the normal; substitute directly into the point-normal form.

Solution: by the point-normal form

$$2(x-1) - (y-2) + (z-3) = 0$$

which simplifies to $2x - y + z - 3 = 0$.

Comment: the normal sits in the coefficients and the point fixes the constant; this is the fastest way to write a plane.

### Example 2 (intermediate: distance from a point to a line)

Problem: find the distance from $P(1,1,1)$ to the line $L: \dfrac{x}{1} = \dfrac{y-1}{1} = \dfrac{z-2}{-1}$.

Analysis: take $M_0(0,1,2)$ on the line and direction $\vec{s}=(1,1,-1)$, then use $d = |\overrightarrow{M_0P}\times\vec{s}|/|\vec{s}|$.

Solution: $\overrightarrow{M_0P} = (1,0,-1)$.

$$\overrightarrow{M_0P}\times\vec{s} = \begin{vmatrix} \vec{i} & \vec{j} & \vec{k} \\ 1 & 0 & -1 \\ 1 & 1 & -1 \end{vmatrix} = (1,\ 0,\ 1)$$

$|\overrightarrow{M_0P}\times\vec{s}| = \sqrt{2}$, $|\vec{s}| = \sqrt{3}$, so $d = \sqrt{2/3} = \dfrac{\sqrt{6}}{3}$.

Comment: the point-to-line distance is the height of the parallelogram on the joining segment and the direction—cross-product norm over base length.

### Example 3 (advanced: line-plane angle)

Problem: find the angle between the line $\dfrac{x}{1} = \dfrac{y}{2} = \dfrac{z}{3}$ and the plane $x+2y+3z-6=0$.

Analysis: direction $\vec{s}=(1,2,3)$, normal $\vec{n}=(1,2,3)$—they are parallel, so the line is perpendicular to the plane and the angle is $90^\circ$.

Solution: $\sin\varphi = \dfrac{|\vec{s}\cdot\vec{n}|}{|\vec{s}||\vec{n}|} = \dfrac{|1+4+9|}{\sqrt{14}\sqrt{14}} = 1$, so $\varphi = \dfrac{\pi}{2}$.

Comment: when the direction and the normal are parallel the line is perpendicular to the plane; checking whether points of the line lie in the plane then separates "contained in the plane" from "parallel and disjoint". To classify a line-plane relation, first ask whether $\vec{s}$ and $\vec{n}$ are parallel, then whether there is a common point.

### Example 4 (supplementary: a plane through a given line by a pencil)

Problem: find the plane through the line $L: \begin{cases} x+y+z=1 \\ x-y-z=0 \end{cases}$ and through the point $(1,1,1)$.

Analysis: use the pencil $\pi_1 + \lambda\pi_2 = 0$ through $L$ and fix $\lambda$ with the given point.

Solution: the pencil is $(x+y+z-1) + \lambda(x-y-z) = 0$. Substituting $(1,1,1)$: $2 + \lambda\cdot(-1) = 0$, so $\lambda = 2$. The plane is

$$(x+y+z-1) + 2(x-y-z) = 0 \;\Rightarrow\; 3x - y - z - 1 = 0$$

Comment: the pencil turns "through a fixed line" into a one-parameter family; the second condition pins the parameter, so no normal has to be recomputed.

## VI. Common Mistakes

1. **Using a cosine for the line-plane angle**: it should be the sine $\sin\varphi = |\vec{s}\cdot\vec{n}|/(|\vec{s}||\vec{n}|)$; a cosine gives the complement.
2. **Writing 0 in a denominator of the symmetric form**: when a component of the direction vanishes, never divide by 0; split off $x=x_0$ instead.
3. **Missing the absolute value or the root in point-plane distance**: the denominator must be the normal's length $\sqrt{A^2+B^2+C^2}$.
4. **Swapping numerator and denominator in the skew-line formula**: the numerator is the absolute mixed product, the denominator the cross-product norm.
5. **Losing one plane in a pencil**: $\pi_1+\lambda\pi_2=0$ does not include $\pi_2$ itself; check $\pi_2$ separately when needed.
6. **Solving two planes together without checking consistency**: the system must have solutions (the planes must not be parallel), otherwise there is no intersection line.

## VII. Summary and Mnemonic

Recap:
- A plane's normal goes into the coefficients; a line's direction goes into the denominators of the symmetric form.
- Distances: point-plane by projection, point-line by the cross-product height, skew lines by mixed product over cross-product norm.
- Angles: plane-plane and line-line use the cosine, line-plane uses the sine.
- The pencil of planes is the standard tool for "through a known line" problems; an intersection line comes from solving two planes together.

Mnemonic: **"Normal in the coefficients, direction in the denominators; line-plane angle takes the sine, pencils pass through fixed lines."**`,
  },

  'quadric-surfaces': {
    chapter: 'Chapter 3 Quadric Surfaces',
    title: 'Quadric Surfaces and Coordinate Changes',
    summary:
      'Five names, seven surfaces: ellipsoid, hyperboloids, paraboloids, cone—picture them by slicing, classify them by invariants.',
    keyPoints: [
      'The slicing method is the universal way to imagine a surface: does a horizontal cut give an ellipse or a hyperbola?',
      'Both the hyperboloid of one sheet and the saddle are ruled surfaces—straight lines can weave a curved surface',
      'Surface of revolution: replace the coordinate of the revolved curve by the distance to the axis',
      'Conic classification looks at AC−B²: positive ellipse, negative hyperbola, zero parabola',
    ],
    content: String.raw`

The graph of a one-variable function $y=f(x)$ is a plane curve; the graph of a two-variable function $z=f(x,y)$ is a surface in space. The most regular class of surfaces comes from "quadratic equations", the quadric surfaces: the standard shapes—sphere, ellipsoid, hyperboloids, paraboloids, cones—that recur in mechanics, optics and relativity (a satellite dish is a paraboloid, a cooling tower a hyperboloid of one sheet). How do you "see" a surface that is given only by an equation? Analytic geometry offers two tools: the slicing method (cut with planes and look at the cross-sections) and classification by invariants (use coordinate changes to reduce the equation to its simplest form and read off the type from invariants).

## II. Formal Definition

**Slicing method**: cut the surface by coordinate planes or planes parallel to them and inspect the shape of the intersection curves (traces), thereby imagining the whole. Cutting with $z=z_0$, for instance, gives a plane curve; sliding $z_0$ through its range reveals the profile.

**Five standard quadric surfaces** (in standard position):

- Ellipsoid: $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}+\dfrac{z^2}{c^2}=1$; every trace is an ellipse; bounded and closed.
- Hyperboloid of one sheet: $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}-\dfrac{z^2}{c^2}=1$; horizontal traces are ellipses, vertical traces hyperbolas; it is a ruled surface (woven from straight lines).
- Hyperboloid of two sheets: $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}-\dfrac{z^2}{c^2}=1$; two separate sheets.
- Elliptic paraboloid: $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=2z$; horizontal traces ellipses, vertical traces parabolas (like a satellite dish).
- Hyperbolic paraboloid (saddle): $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=2z$; rises along one direction and falls along the other, also a ruled surface.
- Quadratic cone: $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}-\dfrac{z^2}{c^2}=0$; vertex at the origin.

**Cylinders and surfaces of revolution**: a cylinder equation contains only two variables (e.g. $x^2+y^2=R^2$ is a circular cylinder with generators parallel to the $z$ axis). Revolving the curve $\begin{cases} f(y,z)=0 \\ x=0 \end{cases}$ about the $z$ axis gives $f(\pm\sqrt{x^2+y^2},z)=0$.

**Coordinate changes and classification**: translation removes linear terms, rotation removes the cross term $xy$. The quadratic form

$$Ax^2 + 2Bxy + Cy^2 + \cdots = 0$$

is classified by invariants:

$$I_1 = A+C, \quad I_2 = \begin{vmatrix} A & B \\ B & C \end{vmatrix} = AC-B^2, \quad I_3 = \det\begin{pmatrix} A & B & D \\ B & C & E \\ D & E & F \end{pmatrix}$$

$I_2>0$ is elliptic, $I_2<0$ hyperbolic, $I_2=0$ parabolic.

## III. Why Define It This Way

**Why does slicing work?** A surface is continuous, so successive traces act like CT slices; if every slice is an ellipse whose size varies continuously, the whole must be ellipsoidal. Slicing reduces "three-dimensional imagination" to "a string of two-dimensional curves", which is what the human brain does best.

**Why is the hyperboloid of one sheet a ruled surface?** It really is covered by straight lines (two families of generators). This is counterintuitive but verifiable algebraically: write the equation as a one-parameter family of lines via hyperbolic functions, and every point on a line satisfies the equation. Cooling towers use this shape because it is both light and stable.

**Why does classification look at $AC-B^2$?** The cross term $2Bxy$ can be removed by rotation, and rotation preserves $I_2=AC-B^2$. The sign of $I_2$ determines the definiteness of the quadratic form, hence whether the surface is "closed elliptic", "open hyperbolic" or "parabolic". This is intrinsic geometry, independent of the coordinates chosen.

**Counterexample (the condition cannot be dropped)**: if $I_2=0$ but $I_3\neq 0$ the type is parabolic (a paraboloid); if $I_2=0$ and $I_3=0$ higher invariants must be consulted—you cannot call everything parabolic. Use $I_1,I_2,I_3$ together for a complete classification.

## IV. Intuition and Pictures

**Quick trace table**:
| Surface | $z=z_0$ trace | $x=0$ trace |
|---------|---------------|-------------|
| Ellipsoid | Ellipse | Ellipse |
| Hyperboloid of one sheet | Ellipse | Hyperbola |
| Hyperboloid of two sheets | Hyperbola (two branches) | Hyperbola |
| Elliptic paraboloid | Ellipse | Parabola |
| Saddle | Hyperbola | Parabola |

**The feel of a saddle**: standing at the origin, the $x$ direction is a valley (downward) and the $y$ direction a ridge (upward); the shape resembles a potato chip, hence "saddle".

**Rule for surfaces of revolution**: replace the coordinate of the revolved curve by the distance to the axis of rotation. Revolving $y^2=2pz$ about $z$ gives $x^2+y^2=2pz$ after replacing $y$ with $\sqrt{x^2+y^2}$.

**Picture of invariants**: rotating coordinates is like turning the camera; the surface does not change, so $I_1,I_2$ do not change. The type belongs to the surface, not to how you hold the camera.

## V. Worked Examples

### Example 1 (basic: recognizing a surface from its equation)

Problem: identify the quadric $z = \dfrac{x^2}{4} - \dfrac{y^2}{9}$ and describe its traces.

Analysis: it has the form $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=2z$ (here the coefficient of $z$ is 1), so it is a hyperbolic paraboloid (saddle).

Solution: set $z=z_0$: the trace is $\dfrac{x^2}{4}-\dfrac{y^2}{9}=z_0$, a hyperbola opening along $x$ when $z_0>0$, along $y$ when $z_0<0$, and two intersecting lines when $z_0=0$. Setting $x=0$ gives $z=-y^2/9$ (a downward parabola), $y=0$ gives $z=x^2/4$ (an upward parabola). Hence a saddle.

Comment: first spot "one square added, one subtracted, equals a linear $z$"—that is the saddle; then check that the two parabolas open in opposite directions, confirming "one up, one down".

### Example 2 (intermediate: equation of a surface of revolution)

Problem: revolve the curve $\begin{cases} y^2=2pz \\ x=0 \end{cases}$ about the $z$ axis and find the resulting surface.

Analysis: revolving about $z$ means replacing $y$ by the distance to the axis, $\sqrt{x^2+y^2}$.

Solution: $x^2+y^2 = 2pz$, a paraboloid of revolution.

Comment: general rule for revolution—the axis coordinate is unchanged, the other coordinate becomes the root of the sum of squares of the two remaining coordinates. About $z$: $z$ stays, $y\to\sqrt{x^2+y^2}$.

### Example 3 (advanced: classifying a conic by invariants)

Problem: classify $3x^2+2xy+3y^2-4=0$ by invariants.

Analysis: $A=3,B=1,C=3$; compute $I_2=AC-B^2$ and $I_3$ first.

Solution: $I_2 = 3\cdot 3 - 1^2 = 8 > 0$, so it is elliptic. $I_3 = \begin{vmatrix} 3 & 1 & 0 \\ 1 & 3 & 0 \\ 0 & 0 & -4 \end{vmatrix} = -4(9-1) = -32 \neq 0$. Since $I_2>0$ and $I_3\neq 0$, it is an (real) ellipse. Indeed, rotating away $xy$ gives $2x'^2+4y'^2=4$, i.e. $\dfrac{x'^2}{2}+y'^2=1$.

Comment: invariants classify without completing squares; $I_2$ first fixes the family, then $I_3$ separates real from imaginary. Fast and immune to axis errors.

### Example 4 (supplementary: recognizing a cylinder)

Problem: what surface does $x^2+z^2=1$ represent?

Analysis: the equation lacks $y$, so it extends freely along $y$—a cylinder; the section $y=\text{constant}$ is the circle $x^2+z^2=1$.

Solution: a circular cylinder of radius 1 with generators parallel to the $y$ axis.

Comment: whenever an equation misses a variable, it is a cylinder whose generators are parallel to that axis. Missing $y$ means generators parallel to $y$. This is the shortcut for reading "cylinder" straight off an equation.

## VI. Common Mistakes

1. **Mistaking a saddle for a hyperboloid of two sheets**: the saddle has a linear $z$ (parabolic type), the two-sheet hyperboloid has squares on both sides with opposite signs (hyperbolic type); look for a first-degree term.
2. **Reading traces in the wrong direction**: fix which variable is constant before naming the curve, so "horizontal" and "vertical" traces are not confused.
3. **Revolving the wrong variable**: about the $z$ axis, $z$ stays fixed; only the coordinate of the revolved curve is replaced.
4. **Computing only $I_2$**: for the elliptic case $I_3$ is still needed to separate real ellipse, point ellipse and imaginary ellipse.
5. **Calling a cylinder a curve or a sphere**: a missing variable means a cylinder, not a sphere (a sphere has three squared terms with equal coefficients).
6. **Assuming ruled surfaces cannot be flat**: the one-sheet hyperboloid and the saddle are woven from straight lines—they look curved but hide a family of lines.

## VII. Summary and Mnemonic

Recap:
- Slicing is the universal way to imagine a surface: horizontal cuts show ellipses or hyperbolas, vertical cuts parabolas.
- The hyperboloid of one sheet and the saddle are ruled surfaces (lines can weave a surface).
- Revolution: the axis coordinate is unchanged, the other coordinate becomes the distance to the axis.
- Conics and quadrics are classified by invariants: $I_2>0$ elliptic, $I_2<0$ hyperbolic, $I_2=0$ parabolic.
- An equation missing a variable is a cylinder with generators parallel to that axis.

Mnemonic: **"Slices reveal the shape, revolution keeps the axis; classify by AC−B², ruled surfaces hide straight lines."**`,
  },

  'coordinate-transforms': {
    chapter: 'Chapter 4 Coordinate Transformations',
    title: 'Coordinate Transformations and Classification of Quadrics',
    summary:
      'Translation zeroes the centre, rotation removes the cross term; eigenvalues of the quadratic form give the standard-form coefficients, invariants decide the type.',
    keyPoints: [
      'Translation removes linear terms (centre to origin), rotation removes the cross term (align the principal axes)',
      'Eigenvalues of the quadratic form XᵀMX give the standard-form coefficients, eigenvectors the new axes',
      'Invariants I₁=A+C, I₂=AC−B², I₃: I₂ decides the family, I₃ decides degeneracy',
      'Orthogonal transformations preserve lengths and angles—they are the linear part of isometries',
    ],
    content: String.raw`

The same figure, viewed head-on or from above at an angle, can be described by completely different equations—yet the figure has not changed. Like photographing one mountain from the east or the north: the pictures differ, the mountain does not. Coordinate transformations study how to change the coordinate system (translate, rotate) so that a crooked equation becomes a well-aligned standard form whose shape is obvious at a glance. In analytic geometry almost every conic and quadric is hard to recognize because a cross term $xy$ has crept in; rotating the axes removes it. This chapter turns "changing coordinates" into a computable algebraic procedure and identifies the quantities that survive the change (invariants).

## II. Formal Definition

**Translation**: with the new origin at $(x_0,y_0)$ in the old system,

$$\begin{cases} x = x' + x_0 \\ y = y' + y_0 \end{cases}$$

Translation removes linear terms and is used to move the centre to the origin.

**Rotation** (about the origin by angle $\theta$):

$$\begin{cases} x = x'\cos\theta - y'\sin\theta \\ y = x'\sin\theta + y'\cos\theta \end{cases}$$

Its purpose is to remove the cross term $xy$, choosing $\theta$ with $\cot 2\theta = \dfrac{A-C}{2B}$.

**General orthogonal transformation**: written as $\vec{X} = Q\vec{X}'$ with $Q$ orthogonal ($Q^{\mathrm T}Q = I$), preserving lengths and angles.

**Diagonalizing the quadratic form**: the quadratic part of $Ax^2+2Bxy+Cy^2+2Dx+2Ey+F=0$ is $\vec{X}^{\mathrm T}M\vec{X}$ with

$$M = \begin{pmatrix} A & B \\ B & C \end{pmatrix}$$

The eigenvalues $\lambda_1,\lambda_2$ give the coefficients of the standard form, the eigenvectors the directions of the new axes.

**Invariants** (unchanged under orthogonal transformations):

$$I_1 = A+C = \lambda_1+\lambda_2, \quad I_2 = AC-B^2 = \lambda_1\lambda_2, \quad I_3 = \det\begin{pmatrix} A & B & D \\ B & C & E \\ D & E & F \end{pmatrix}$$

## III. Why Define It This Way

**Why remove $xy$?** The cross term means the axes no longer coincide with the symmetry axes of the figure, so the equation looks twisted. After rotating to the eigenvector directions the principal axes line up with the new axes and the equation becomes $\lambda_1 x'^2+\lambda_2 y'^2+\cdots$, whose type is plain.

**Why eigenvalues and eigenvectors?** Eigenvectors of the symmetric matrix $M$ are mutually perpendicular (orthogonalizable) and make perfect new axes; the eigenvalues are the "stretch factors" along the new directions. This is where linear algebra and analytic geometry meet.

**Why are invariants so important?** Rotations and translations preserve the intrinsic geometry (whether the curve is an ellipse, the sign of its area), so quantities determined by that geometry must be invariant. Classification by invariants needs no explicit transformation.

**Counterexample (the condition cannot be dropped)**: if you rotate before removing the linear terms, the cross term may vanish but the linear terms become messy and the standard form stays ugly. The right order is "translate the centre to zero first, then rotate away the cross term" (or use matrix completing-the-square throughout).

## IV. Intuition and Pictures

**Geometry of rotation**: turn the camera by $\theta$ about the origin and the figure appears rotated by $-\theta$; orthogonal maps preserve length, so distances, angles and areas are undistorted.

**Eigenvalues are the principal axes**: eigenvector directions are the major and minor axes of the ellipse, and the eigenvalues are (up to a scale) the reciprocals of the squared semi-axes.

**Invariant table**:
| Invariant | Meaning |
|-----------|---------|
| $I_1$ | Trace of the quadratic part, sets the overall "opening size" |
| $I_2$ | Discriminant: $>0$ ellipse, $<0$ hyperbola, $=0$ parabola |
| $I_3$ | Separates real from imaginary and detects degeneracy |

**An alternative: completing the square**: without angle formulas, complete squares in $x,y$ directly to reach the standard form—handy by hand.

## V. Worked Examples

### Example 1 (basic: removing a cross term by rotation)

Problem: remove the cross term from $xy = 1$ and identify the curve.

Analysis: $A=C=0,B=1/2$, so $\cot 2\theta = 0$, $2\theta = \pi/2$, $\theta=\pi/4$.

Solution: with $\theta=\pi/4$ the rotation gives $x = \dfrac{x'-y'}{\sqrt{2}}$, $y = \dfrac{x'+y'}{\sqrt{2}}$. Substituting into $xy=1$:

$$\frac{x'-y'}{\sqrt{2}}\cdot\frac{x'+y'}{\sqrt{2}} = \frac{x'^2-y'^2}{2} = 1 \;\Rightarrow\; x'^2 - y'^2 = 2$$

This is an equilateral hyperbola (standard form $\dfrac{x'^2}{2}-\dfrac{y'^2}{2}=1$).

Comment: $xy=1$ looks special, but a $45^\circ$ rotation reveals the hyperbola at once; a cross term is the signature of "axes not aligned".

### Example 2 (intermediate: the eigenvalue method)

Problem: reduce $5x^2+4xy+2y^2=1$ to standard form by eigenvalues.

Analysis: the matrix is $M = \begin{pmatrix} 5 & 2 \\ 2 & 2 \end{pmatrix}$; find its eigenvalues.

Solution: $\det(M-\lambda I) = (5-\lambda)(2-\lambda)-4 = \lambda^2-7\lambda+6 = 0$, so $\lambda_1=6,\lambda_2=1$. The standard form is $6x'^2 + y'^2 = 1$, the ellipse $\dfrac{x'^2}{1/6}+y'^2=1$.

Comment: eigenvalues give the coefficients directly, no rotation angle needed; eigenvectors are optional once the type is clear.

### Example 3 (advanced: translate then rotate)

Problem: reduce $x^2+4xy+4y^2+2x+4y = 0$ to standard form and identify it.

Analysis: the quadratic part $x^2+4xy+4y^2 = (x+2y)^2$ is a perfect square (parabolic type); handle the linear terms together with that square.

Solution: let $u = x+2y$; the equation becomes $u^2 + 2x + 4y = 0$. Since $2x+4y = 2(x+2y)=2u$, we get $u^2+2u=0$, i.e. $u(u+2)=0$. These are the two parallel lines $x+2y=0$ and $x+2y=-2$ (a degenerate parabolic case).

Comment: when the quadratic part is a perfect square the curve is parabolic ($I_2 = 1\cdot 4 - 2^2 = 0$); substituting the whole expression usually yields a degenerate case (lines or a point), and there is no need to force an ellipse or hyperbola standard form.

## VI. Common Mistakes

1. **Recalling the angle formula backwards**: use $\cot 2\theta = (A-C)/(2B)$, not $\tan$; a sign slip rotates by an extra $90^\circ$.
2. **Wrong order of rotation and translation**: complete the square to move the centre to the origin first, then rotate; reversing the order introduces messy linear terms.
3. **Ignoring degenerate cases**: when $I_3=0$ the "conic" may be two lines or a point, not a standard conic.
4. **Treating any linear map as orthogonal**: rotations preserve length, a general linear map stretches and distorts, so it cannot be used for shape-preserving classification.
5. **Sign errors in eigenvalues**: eigenvalues of a symmetric matrix are real; complex values signal an arithmetic mistake.
6. **Non-perpendicular new axes**: the new axes must be mutually perpendicular, otherwise the matrix is not orthogonal and the formulas fail.

## VII. Summary and Mnemonic

Recap:
- Translation removes linear terms (centre to origin), rotation removes the cross term (align principal axes).
- Eigenvalues of $\vec{X}^{\mathrm T}M\vec{X}$ give the standard-form coefficients, eigenvectors the new axes.
- Invariants $I_1,I_2,I_3$ are unchanged by orthogonal transformations; $I_2$ gives the family, $I_3$ the degeneracy.
- A perfect-square quadratic part usually means a degenerate parabolic case (lines or a point).

Mnemonic: **"Translate the centre to zero, rotate to align the axes; eigenvalues are the coefficients, invariants name the type."**`,
  },

  'conic-theory': {
    chapter: 'Chapter 5 General Theory of Conics',
    title: 'General Theory of Conic Sections',
    summary:
      'Recover the whole figure from an arbitrary quadratic equation: classify by invariants, solve the centre equations, complete the square and rotate to the standard form—the most concrete stage for quadratic forms.',
    keyPoints: [
      'General conic Ax²+2Bxy+Cy²+2Dx+2Ey+F=0',
      'Invariants: I₂>0 ellipse, I₂<0 hyperbola, I₂=0 parabola; I₃ and K₁ detect degeneracy',
      'The centre solves MX_c+b=0; ellipses and hyperbolas have one, parabolas none',
      'Hyperbola asymptotes come from setting the quadratic part to zero',
    ],
    content: String.raw`

Conic sections (circle, ellipse, parabola, hyperbola) were first obtained by cutting a cone with a plane; in coordinates they unify into one "quadratic equation" $Ax^2+2Bxy+Cy^2+2Dx+2Ey+F=0$. But a concrete equation usually mixes a cross term, linear terms and a constant, and it is hard to say at a glance what it is, where its centre lies, how long its axes are. The general theory of conics is the algorithm that recovers the whole figure from an arbitrary quadratic equation: classify by invariants, complete squares or rotate to find the centre and principal axes, then write the standard form. It is where analytic geometry grows from "particular figures" to "general equations", and the most intuitive application of quadratic forms from linear algebra.

## II. Formal Definition

**General quadratic equation**:

$$Ax^2 + 2Bxy + Cy^2 + 2Dx + 2Ey + F = 0$$

with matrices

$$M = \begin{pmatrix} A & B \\ B & C \end{pmatrix}, \quad \vec{b} = \begin{pmatrix} D \\ E \end{pmatrix}$$

**Invariants (under orthogonal transformations)**:

$$I_1 = A+C, \quad I_2 = AC-B^2, \quad I_3 = \det\begin{pmatrix} A & B & D \\ B & C & E \\ D & E & F \end{pmatrix}, \quad K_1 = \begin{vmatrix} A & D \\ D & F \end{vmatrix} + \begin{vmatrix} C & E \\ E & F \end{vmatrix}$$

**Centre**: a non-parabolic conic has a unique centre $(x_c,y_c)$ satisfying $\begin{cases} Ax_c+By_c+D=0 \\ Bx_c+Cy_c+E=0 \end{cases}$, that is $M\vec{X}_c + \vec{b}=0$.

**Classification criteria**:
- $I_2 > 0$: elliptic. $I_3\neq 0$ gives an ellipse (possibly imaginary); $I_3=0$ gives a single point.
- $I_2 < 0$: hyperbolic. $I_3\neq 0$ gives a hyperbola; $I_3=0$ gives a pair of intersecting lines.
- $I_2 = 0$: parabolic. $I_3\neq 0$ gives a parabola; $I_3=0$ with $K_1<0$ gives a pair of parallel lines, $K_1>0$ imaginary parallel lines, $K_1=0$ a single line.

**Finding the standard form**: translate to the centre (elliptic/hyperbolic cases), rotate away $xy$, obtaining $\lambda_1 x'^2 + \lambda_2 y'^2 = -F'$.

## III. Why Define It This Way

**Why does the centre satisfy that linear system?** The centre is the point of symmetry: every point symmetric to it lies on the curve, so the first partial derivatives ($Ax+By+D$ and $Bx+Cy+E$) vanish there. That is exactly $M\vec{X}_c+\vec{b}=0$.

**Why do invariants classify?** Rotation and translation change only the viewpoint, not the geometric fact that the curve is an ellipse or a hyperbola; hence type-determining quantities must be invariant. $I_2=AC-B^2$ is the heart of the definiteness of a quadratic form: positive definite → closed ellipse, indefinite → open hyperbola, semidefinite → parabola.

**Why has a parabola no centre?** For parabolic type $I_2=0$ the matrix $M$ is singular and $M\vec{X}_c+\vec{b}=0$ has no solution (or infinitely many). Geometrically a parabola has no point of symmetry—it opens at one end and cannot be symmetric about any point.

**Counterexample (the condition cannot be dropped)**: looking at $I_2$ alone confuses degenerate cases (two intersecting or parallel lines, a single point) with proper conics; $I_3$ and $K_1$ must be used to separate them.

## IV. Intuition and Pictures

**Where conics come from**: cut a right circular cone with a plane—perpendicular to the axis gives a circle, tilted gives an ellipse, parallel to a generator gives a parabola, steeper gives a hyperbola. Four curves, one family.

**Classification at a glance**:
| $I_2$ | Type | Typical standard form |
|-------|------|-----------------------|
| $>0$ | Ellipse | $x'^2/a^2+y'^2/b^2=1$ |
| $<0$ | Hyperbola | $x'^2/a^2-y'^2/b^2=1$ |
| $=0$ | Parabola | $y'^2=2px'$ |

**Axes and eccentricity**: principal axes of ellipses and hyperbolas lie along the eigenvectors; the eccentricity $e = c/a$ measures how "flat" or how "wide" the curve is.

**Completing the square**: first complete squares in $x,y$ to remove linear terms (finding the centre or vertex), then rotate away $xy$, then normalize the constant term.

## V. Worked Examples

### Example 1 (basic: classification by invariants)

Problem: classify $x^2-4xy+4y^2-2x+4y-1=0$.

Analysis: $A=1,B=-2,C=4$; compute $I_2$ and $I_3$ first.

Solution: $I_2 = 1\cdot 4 - (-2)^2 = 0$, so it is parabolic. Compute $I_3 = \begin{vmatrix} 1 & -2 & -1 \\ -2 & 4 & 2 \\ -1 & 2 & -1 \end{vmatrix}$. Expanding along the first row:

$$1(4\cdot(-1)-2\cdot 2) - (-2)((-2)(-1)-2(-1)) + (-1)((-2)\cdot 2 - 4(-1)) = 1(-8) + 2(2+2) -1(-4+4) = -8+8-0 = 0$$

$I_3=0$ and $K_1 = \begin{vmatrix}1&-1\\-1&-1\end{vmatrix}+\begin{vmatrix}4&2\\2&-1\end{vmatrix} = (-1-1)+(-4-4) = -10 < 0$, so the curve is a pair of parallel lines (degenerate parabolic type). Check: is the original expression $(x-2y)^2 - 2(x-2y) -1$? Setting $u=x-2y$ gives $u^2-2u-1$, not a perfect square—completing the square gives two parallel lines; the invariant verdict is a degenerate parabolic conic.

Comment: invariants settle the family and the degeneracy first, then completing the square shows the concrete shape, avoiding blind expansion.

### Example 2 (intermediate: centre and standard form)

Problem: reduce the ellipse $5x^2+4xy+2y^2-6x-4y-10=0$ to standard form.

Analysis: find the centre from $M\vec{X}_c+\vec{b}=0$, then rotate away $xy$.

Solution: $M = \begin{pmatrix}5&2\\2&2\end{pmatrix}$, $\vec{b}=(-3,-2)$. Solving $5x_c+2y_c-3=0,\ 2x_c+2y_c-2=0$ gives $x_c=1/3,\ y_c=2/3$. After translation the quadratic part has eigenvalues $\lambda_1=6,\lambda_2=1$ (as before), so the standard form is $6x'^2+y'^2 = \text{constant}>0$: an ellipse.

Comment: the centre is the "origin" after completing the square; once the axes are aligned, the semi-axes are the square roots of the reciprocals of the eigenvalues.

### Example 3 (advanced: asymptotes and directions of a hyperbola)

Problem: for $x^2-4xy+4y^2-2x+4y-1=0$, find the directions of the degenerate parallel lines (or of the proper case).

Analysis: for parabolic type the quadratic part $(x-2y)^2$ gives the dominant direction; if the curve degenerates into two lines, their direction comes from factoring the quadratic part.

Solution: the quadratic part is $(x-2y)^2$, so the relevant family of lines has direction $x-2y=\text{constant}$. If completing the square yields $(x-2y-a)(x-2y-b)=0$, the two parallel lines are both parallel to $x-2y=0$ (slope $1/2$).

Comment: factoring the quadratic part gives the direction of degenerate lines directly; this is the general rule that "the quadratic part fixes the asymptotic or parallel directions", and hyperbola asymptotes likewise come from setting the quadratic part to zero.

## VI. Common Mistakes

1. **Looking only at $I_2$**: $I_3,K_1$ are needed to separate proper conics from degenerate ones (lines, a point).
2. **Hunting for a centre in the parabolic case**: parabolas have none; forcing $M\vec{X}_c+\vec{b}=0$ yields a contradiction or no solution.
3. **Wrong rotation angle**: as in the coordinate-transformation chapter, $\cot 2\theta=(A-C)/(2B)$, and mind the quadrant.
4. **Sign error when normalizing the constant**: the right-hand side sign decides real versus imaginary (an ellipse needs a positive right side).
5. **Forgetting that asymptotes come from the quadratic part**: hyperbola asymptotes are the two lines obtained by setting the quadratic part $=0$.
6. **Misreading the $B$ in $2Bxy$**: the equation is written with $2Bxy$, so the off-diagonal entry of the matrix is $B$, not $2B$.

## VII. Summary and Mnemonic

Recap:
- A general conic is classified by invariants: $I_2>0$ ellipse, $I_2<0$ hyperbola, $I_2=0$ parabola; then $I_3,K_1$ detect degeneracy.
- The centre solves $M\vec{X}_c+\vec{b}=0$; ellipses and hyperbolas have one, parabolas do not.
- Standard form = translate to the centre + rotate away $xy$; the coefficients are the eigenvalues.
- Hyperbola asymptotes come from the quadratic part $=0$; degenerate cases are usually lines or a point.

Mnemonic: **"Invariants name the type, the centre equation finds the point; rotate to align the axes, the quadratic part hides the asymptotes."**`,
  },

  'isometries': {
    chapter: 'Chapter 6 Isometries and Affine Transformations',
    title: 'Isometries and Affine Transformations',
    summary:
      'Isometries (orthogonal map plus translation) preserve lengths and angles; affine maps (invertible linear part plus translation) preserve parallelism and collinearity—the algebraic face of geometric symmetry groups.',
    keyPoints: [
      'Isometry = orthogonal matrix Q (rotation/reflection) + translation t, preserving distances and angles',
      'Four planar isometries: translation, rotation, reflection, glide reflection',
      'Affine map = invertible A (det≠0) + translation, preserving collinearity, parallelism and ratios of division',
      'Fundamental theorem of affine geometry: any three non-collinear points map to any three non-collinear points',
    ],
    content: String.raw`

What geometry studies are precisely the properties that survive some transformation. Slide, rotate or flip a sheet of paper and its shape and size are unchanged—transformations that preserve distance are isometries (rigid motions). Stretch the figure along one direction instead (turn a square into a parallelogram) and distances change, but parallel lines stay parallel and midpoints stay midpoints—this looser class is the affine transformations. Isometries and affine maps are the "symmetry groups" of geometry: understanding under which transformations a figure becomes itself (or another equivalent figure) is understanding its essence. This chapter gives matrix representations, classifications and basic properties of both classes.

## II. Formal Definition

**Isometry (rigid motion)**: a plane map $f$ with $|f(P)-f(Q)| = |P-Q|$ for all points $P,Q$. The general planar isometry is

$$\begin{pmatrix} x' \\ y' \end{pmatrix} = Q \begin{pmatrix} x \\ y \end{pmatrix} + \vec{t}, \qquad Q^{\mathrm T}Q = I$$

where $Q$ is orthogonal (rotation or reflection) and $\vec{t}$ is a translation.

**Two kinds of orthogonal matrix** (in the plane):
- Rotation: $Q = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$, determinant $+1$ (orientation preserving).
- Reflection: $Q = \begin{pmatrix} \cos 2\phi & \sin 2\phi \\ \sin 2\phi & -\cos 2\phi \end{pmatrix}$, determinant $-1$ (orientation reversing).

**Classification of planar isometries**: translation, rotation, reflection, glide reflection (reflection plus a slide along its axis)—four classes; the orientation-preserving ones are translations and rotations, the reversing ones reflections and glide reflections.

**Affine transformation**: of the form

$$\begin{pmatrix} x' \\ y' \end{pmatrix} = A \begin{pmatrix} x \\ y \end{pmatrix} + \vec{b}, \qquad \det A \neq 0$$

with $A$ any invertible matrix. It preserves collinearity, parallelism and ratios of division along a line, but not distances or angles.

**Affine coordinates and fixed points**: an affine map is invertible; any three non-collinear points can be sent to any three non-collinear points (fundamental theorem of affine geometry).

## III. Why Define It This Way

**Why must an isometry be orthogonal?** The squared distance is $|Q\vec{v}|^2 = \vec{v}^{\mathrm T}Q^{\mathrm T}Q\vec{v}$; for this to equal $|\vec{v}|^2$ for every $\vec{v}$ we need $Q^{\mathrm T}Q=I$, i.e. orthogonality. An orthogonal matrix is the algebraic embodiment of a "length-preserving linear map".

**Why does an affine map only require $\det A\neq 0$?** What it preserves is the linear structure (collinearity, parallelism, midpoint ratios), which depends only on the invertible linear part, not on lengths. Invertibility guarantees a one-to-one, invertible map.

**Why separate orientation preserving from reversing?** The sign of the determinant distinguishes a "true rotation" (no flip) from a reflection (a flip); flipping reverses orientation (left hand becomes right hand), and many geometric quantities (signed areas) are orientation sensitive.

**Counterexample (the condition cannot be dropped)**: if $\det A = 0$ the map squashes the plane onto a line, is no longer invertible, and loses the meaning of "equivalent figures"—hence $\det A\neq 0$ is required.

## IV. Intuition and Pictures

**Geometry of isometries**: translation is "carrying the whole figure elsewhere", rotation is "turning about a point", reflection is "looking in a mirror", glide reflection is "mirror and slide at once" (like a footprint pattern). None of them changes any distance or angle.

**Geometry of affine maps**: graph paper is stretched into a parallelogram grid; circles become ellipses, squares become parallelograms, but parallel lines stay parallel, triangles stay triangles, centroids stay centroids. It is like a uniform stretch and shear of a rubber sheet.

**Fixed points**: a rotation has exactly one (its centre), a reflection has a whole axis of them, a nonzero translation has none—the existence and type of fixed points is a clue to the classification.

**Preservation table**:
| Property | Isometry | Affine |
|----------|----------|--------|
| Distance | Preserved | Not preserved |
| Angle | Preserved | Not preserved |
| Parallelism | Preserved | Preserved |
| Collinearity / division ratio | Preserved | Preserved |

## V. Worked Examples

### Example 1 (basic: rotation formula)

Problem: rotate $(1,0)$ counterclockwise about the origin by $90^\circ$ and find the image.

Analysis: use the rotation matrix $Q$ with $\theta=90^\circ$.

Solution: $\cos 90^\circ=0,\sin 90^\circ=1$,

$$\begin{pmatrix} x' \\ y' \end{pmatrix} = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}\begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$$

so the image is $(0,1)$.

Comment: apply the rotation matrix directly; counterclockwise $\theta$ uses the standard matrix, clockwise uses $-\theta$.

### Example 2 (intermediate: a square becomes a parallelogram)

Problem: for the affine map $\begin{pmatrix}x'\\y'\end{pmatrix} = \begin{pmatrix}2&1\\0&1\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix}$, find the images of the unit square's vertices $(0,0),(1,0),(1,1),(0,1)$.

Analysis: the linear part $A$ is invertible ($\det A = 2\neq 0$) and stretches the square into a parallelogram.

Solution: substituting in turn: $(0,0)\to(0,0)$; $(1,0)\to(2,0)$; $(1,1)\to(3,1)$; $(0,1)\to(1,1)$. The four images form a parallelogram (opposite sides parallel and equal).

Comment: the affine map sends a square to a parallelogram but turns right angles into acute ones—exactly "parallelism preserved, angles not".

### Example 3 (advanced: locating the reflection axis)

Problem: for the planar reflection $\begin{pmatrix}x'\\y'\end{pmatrix} = \begin{pmatrix}\cos 2\phi & \sin 2\phi \\ \sin 2\phi & -\cos 2\phi\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix}$, describe the direction of the axis.

Analysis: the reflection matrix has determinant $-1$; fixed points satisfy $(I-Q)\vec{X}=0$, and the direction of that solution space is the axis direction.

Solution: let $\vec{X}$ be a fixed point, so $(I-Q)\vec{X}=0$. From the form of $Q$ the axis direction agrees with $(\cos\phi,\sin\phi)$ (making angle $\phi$ with the $x$ axis). Points on the axis map to themselves; points off it are mirrored across it.

Comment: a reflection is an "orientation-reversing isometry"; recognize it by determinant $-1$ plus a one-dimensional line of fixed points, as opposed to a rotation (one fixed point only).

## VI. Common Mistakes

1. **Omitting the translation term**: the general form includes $\vec{t}$; writing only the orthogonal matrix loses pure translations.
2. **Confusing the determinants of rotation and reflection**: rotation has $\det=+1$, reflection $\det=-1$; orientations differ.
3. **Assuming affine maps preserve length**: in general they preserve neither distance nor angle; only the special (orthogonal) affine maps are isometries.
4. **Allowing $\det A=0$ in an affine map**: $\det A\neq 0$ is required, otherwise the map is degenerate and not invertible.
5. **Miscomputing the axis direction**: it is given by the line of fixed points, not read off the first row of the matrix.
6. **Treating a glide reflection as a plain reflection**: a glide includes a translation along the axis and may have no fixed point.

## VII. Summary and Mnemonic

Recap:
- Isometry = orthogonal $Q$ (rotation preserving orientation, reflection reversing it) + translation $\vec{t}$, preserving distances and angles.
- Four planar isometries: translation, rotation, reflection, glide reflection; the determinant sign separates orientation-preserving from reversing.
- Affine map = invertible linear part $A$ ($\det A\neq 0$) + translation; preserves collinearity, parallelism and division ratios, but not distances or angles.
- Fundamental theorem of affine geometry: any three non-collinear points go to any three non-collinear points.

Mnemonic: **"Isometry is orthogonal plus shift, keeping lengths and angles with a sense of direction; affine stretches invertibly, keeping only parallels and collinearity."**`,
  },
};

export default map;
