import type { Problem } from '@/types';

const map: Record<string, Partial<Problem>> = {
  'p-ag-1': {
    title: 'Volume of a Tetrahedron via the Scalar Triple Product',
    question:
      'Given the points $A(1,0,0)$, $B(0,2,0)$, $C(0,0,3)$ and the origin $O$, find the volume of the tetrahedron $OABC$.',
    hints: [
      'The volume of a tetrahedron is one sixth of the volume of the parallelepiped spanned by the three edges meeting at a common vertex.',
      'The volume of the parallelepiped is the absolute value of the scalar triple product of those three edge vectors.',
    ],
    solution: [
      {
        title: 'Write the three edge vectors',
        detail:
          '$\\vec{OA} = (1,0,0)$, $\\vec{OB} = (0,2,0)$, $\\vec{OC} = (0,0,3)$.',
      },
      {
        title: 'Compute the triple product',
        detail:
          '$(\\vec{OA},\\vec{OB},\\vec{OC}) = \\begin{vmatrix} 1 & 0 & 0 \\\\ 0 & 2 & 0 \\\\ 0 & 0 & 3 \\end{vmatrix} = 6$.',
      },
      {
        title: 'Conclusion',
        detail: '$V = \\dfrac{1}{6}\\big|(\\vec{OA},\\vec{OB},\\vec{OC})\\big| = \\dfrac{6}{6} = 1$.',
      },
    ],
    answer: 'The volume is $1$.',
    tags: ['scalar triple product', 'tetrahedron', 'volume'],
  },
  'p-ag-2': {
    title: 'Plane Through a Given Line via a Pencil of Planes',
    question:
      'Find the equation of the plane that contains the line $L: \\dfrac{x-1}{2} = \\dfrac{y+1}{-1} = \\dfrac{z}{1}$ and is perpendicular to the plane $\\pi: x + y + z = 0$.',
    hints: [
      'All planes through $L$ form a "pencil of planes", written as a linear combination of two planes that both contain $L$.',
      'The perpendicularity condition: the dot product of the two normal vectors is zero.',
    ],
    solution: [
      {
        title: 'Construct the pencil',
        detail:
          'The line $L$ can be written as the intersection of two planes: $\\begin{cases} x + 2y + 1 = 0 \\\\ y + z - 1 = 0 \\end{cases}$ (split out of the symmetric form). The pencil is $$x + 2y + 1 + \\lambda(y + z - 1) = 0$$',
      },
      {
        title: 'Write the normal vector',
        detail:
          'A plane of the pencil has normal $\\vec{n} = (1,\\ 2+\\lambda,\\ \\lambda)$; the normal of $\\pi$ is $\\vec{n_0} = (1,1,1)$.',
      },
      {
        title: 'Perpendicularity condition',
        detail:
          '$\\vec{n} \\cdot \\vec{n_0} = 1 + (2+\\lambda) + \\lambda = 0$ gives $\\lambda = -\\dfrac{3}{2}$. Substituting back: $$x + \\tfrac{1}{2}y - \\tfrac{3}{2}z + \\tfrac{5}{2} = 0, \\quad \\text{i.e. } 2x + y - 3z + 5 = 0$$',
      },
    ],
    answer: 'The plane is $2x + y - 3z + 5 = 0$.',
    tags: ['pencil of planes', 'normal vector', 'perpendicularity'],
  },
  'p-ag-3': {
    title: 'Identifying a Quadric Surface by Its Traces',
    question:
      'Use the method of traces to describe the type and shape of the surface $\\dfrac{x^2}{4} + \\dfrac{y^2}{9} - \\dfrac{z^2}{16} = 1$.',
    hints: [
      'Cut it with the horizontal planes $z = z_0$ and with the vertical plane $x = 0$, and examine the curves of intersection.',
      'Compare with the trace patterns of the five standard types of quadric surface.',
    ],
    solution: [
      {
        title: 'Horizontal traces',
        detail:
          'Cutting with $z = z_0$: $\\dfrac{x^2}{4} + \\dfrac{y^2}{9} = 1 + \\dfrac{z_0^2}{16}$. The right-hand side is always positive, so the trace is an ellipse, and the ellipse grows as $|z_0|$ increases.',
      },
      {
        title: 'Vertical traces',
        detail:
          'Cutting with $x = 0$: $\\dfrac{y^2}{9} - \\dfrac{z^2}{16} = 1$, a hyperbola in the $yz$ plane.',
      },
      {
        title: 'Classification',
        detail:
          'Two positive terms and one negative term equal to a positive number matches the standard form of a hyperboloid of one sheet $\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}-\\dfrac{z^2}{c^2}=1$. Its shape resembles a cooling tower, and it is a ruled surface.',
      },
    ],
    answer: 'A hyperboloid of one sheet (cooling-tower shape, $a=2,\\ b=3,\\ c=4$).',
    tags: ['quadric surface', 'method of traces', 'hyperboloid of one sheet'],
  },
};

export default map;
