import type { Topic } from '@/types';

const map: Record<string, Partial<Topic>> = {
  'classical-ciphers': {
    chapter: 'Chapter 1 Classical Ciphers',
    title: 'Permutation, Substitution and Frequency Analysis',
    summary:
      'From Caesar\u2019s shift to Vigen\u00e8re\u2019s polyalphabetic substitution, watch how frequency analysis punctures again and again the illusion that "many keys means secure".',
    content: String.raw`

In 50 BC, Caesar wrote his military dispatches by shifting every letter three places forward: A became D, B became E, and the recipient needed only to shift three places back to read it. This was the earliest substitution cipher. It was simple enough to do in one's head, and fragile enough for a child to break—because there are only 25 possible shifts, and one can simply try them all.

So people thought: if instead of "shifting everything by the same amount" we scramble the 26 letters arbitrarily, sending A to Q and B to X, then there are $26!$ keys, roughly $4\times 10^{26}$; a computer trying a billion per second would need tens of billions of years. Surely that is safe?

The answer is no. A cryptanalyst armed with only a pencil and a table of English letter frequencies can break such an "arbitrary scramble" within hours. The reason is simple: in English the letter E appears with frequency about $12.7\%$, while Z appears only $0.07\%$ of the time. You can change the names of the letters, but not their "appearance rates". As long as the ciphertext is long enough, the most frequent symbol is almost certainly E.

Opening question: why can a cipher whose keys are too many to enumerate still be broken? Does security depend on the number of keys, or on how much plaintext information remains in the ciphertext? In this chapter we start from classical ciphers and walk all the way to the perfect secrecy of the one-time pad, to see how this question forces Shannon's information theory into existence.

## 2. Rigorous Definitions

**Definition (cryptosystem)**. A cryptosystem consists of a plaintext space $\mathcal{P}$, a ciphertext space $\mathcal{C}$, a key space $\mathcal{K}$, an encryption algorithm $E$ and a decryption algorithm $D$. For every key $k\in\mathcal{K}$, the maps $E_k:\mathcal{P}\to\mathcal{C}$ and $D_k:\mathcal{C}\to\mathcal{P}$ satisfy the correctness condition

$$D_k\bigl(E_k(m)\bigr)=m,\qquad \text{for all } m\in\mathcal{P}.$$

The "space" here is usually all letter strings of length $n$. Correctness is the minimum requirement: encrypting something you cannot decrypt is not encryption, it is destroying data.

**Definition (permutation cipher)**. Take a permutation $\pi$ of $\{1,2,\dots,n\}$ and move the $i$-th letter of the plaintext to position $\pi(i)$ of the ciphertext:

$$c_{\pi(i)}=m_i.$$

The key is the permutation $\pi$, and the key space has size $n!$. It changes only the order of the letters, not the letters themselves. For example, rearranging "MATH" according to $\pi=(3,1,4,2)$ gives "AMTH".

**Definition (substitution cipher)**. Replace letters one by one using a bijection $\sigma:\mathcal{A}\to\mathcal{A}$, so that $c_i=\sigma(m_i)$, where $\mathcal{A}$ is the alphabet. If $\sigma$ is "shift everything by $k$ places", i.e.

$$c=(m+k)\bmod 26,$$

it is called the Caesar cipher, with key $k\in\{0,1,\dots,25\}$ and only 25 non-trivial ones. If $\sigma$ is the affine map

$$c=(am+b)\bmod 26,\qquad \gcd(a,26)=1,$$

it is called the affine cipher. The key is $(a,b)$; there are $\varphi(26)=12$ admissible values of $a$, so the total number of keys is $12\times 26=312$. If $\sigma$ is an arbitrary bijection, it is called a monoalphabetic substitution cipher, with key space $26!$.

**Definition (Vigenère cipher)**. Given a key word $k_0k_1\dots k_{l-1}$ (each letter converted to an integer $0\sim 25$), encrypt position by position:

$$c_i=(m_i+k_{i\bmod l})\bmod 26.$$

It is essentially $l$ Caesar ciphers used in rotation, hence "polyalphabetic substitution".

**Definition (index of coincidence)**. Suppose that in a text of length $n$ the $i$-th letter occurs $n_i$ times. Define the index of coincidence

$$\mathrm{IC}=\frac{\sum_{i=1}^{26} n_i(n_i-1)}{n(n-1)}.$$

The numerator counts the ordered pairs of positions that carry the same letter; the denominator is all ordered pairs, so $\mathrm{IC}$ is the probability that two letters drawn at random are equal. For long English texts $\mathrm{IC}\approx 0.066$, whereas for 26 uniformly random letters $\mathrm{IC}=26\cdot\frac{1}{26}\cdot\frac{1}{26}=1/26\approx 0.0385$. This gap is the key to breaking polyalphabetic ciphers.

**Definition (perfect secrecy)**. A cryptosystem has perfect secrecy if for any $m\in\mathcal{P}$ and $c\in\mathcal{C}$ with $P(C=c)>0$,

$$P(M=m\mid C=c)=P(M=m).$$

In other words, after seeing the ciphertext your belief about the plaintext is unchanged—the ciphertext leaks no information at all. Shannon proved that perfect secrecy requires $|\mathcal{K}|\ge|\mathcal{P}|$, with keys equiprobable and used only once. Schemes meeting these conditions are called one-time pads.

## 3. Why Define It This Way

**Why must encryption be invertible?** Because the purpose of communication is to convey information, not to hide its existence. If $E_k$ were not injective, two different plaintexts would map to the same ciphertext and the receiver could never distinguish them, so the correctness condition could not hold. This also explains why the affine cipher requires $\gcd(a,26)=1$: only when $a$ is coprime to 26 is the map $m\mapsto am+b$ a bijection.

The counterexample is immediate. Take $a=2,b=0$; then $m=0$ and $m=13$ both map to $0$, because $2\times 13=26\equiv 0$. The letters A and N both encrypt to A, and decryption cannot tell which was there. Indeed for $a=2$ the image contains only 13 letters, so the cipher cuts the information content in half.

**Why does the Caesar cipher have 25 keys rather than 26?** Because $k=0$ is the identity map—equivalent to no encryption, offering no secrecy. The real choices are "shift by 1 to 25 places". This reminds us to count "distinct transformations" rather than parameter values when counting a key space.

**Why can't monoalphabetic substitution resist frequency analysis?** Because a bijection only renames the letters; it does not change "which letter appears how many times". If E appears 127 times in the plaintext, then $\sigma(E)$ necessarily appears 127 times in the ciphertext. The frequency vector is merely permuted, preserving the entire ordering structure. The attacker guesses that the most frequent symbol is E, the second most frequent is T, and then, using digrams (TH, HE, IN) and word lengths, reconstructs the whole plaintext like a jigsaw puzzle.

**Why can the Vigenère cipher resist frequency analysis?** The same plaintext letter E is encrypted by different key letters at different positions, possibly becoming J, Q, X, and so on, so the single-letter frequencies are "smeared out" and the ciphertext $\mathrm{IC}$ approaches $0.0385$. Its weakness is periodicity: with key length $l$, every $l$-th position uses the same Caesar shift. Splitting the ciphertext into $l$ columns modulo $l$ degrades each column to a monoalphabetic substitution whose $\mathrm{IC}$ rises back to about $0.066$. So the attack proceeds in two steps: first guess $l$ using $\mathrm{IC}$ or the Kasiski test, then do frequency analysis column by column.

**Why does perfect secrecy require equiprobable keys used only once?** Neither condition can be dropped. If the keys are biased, some $c$ are more likely to arise from particular $m$, and the posterior deviates from the prior. If the same key encrypts two messages $m_1,m_2$ to give $c_1,c_2$, then

$$c_1\oplus c_2=(m_1\oplus k)\oplus(m_2\oplus k)=m_1\oplus m_2,$$

the key cancels completely and the attacker directly obtains the XOR of the two plaintexts. The redundancy of English is enough to recover both plaintexts from that XOR. This is the entire weight of the word "one" in "one-time pad".

## 4. Intuition and Pictures

"Renaming" and "reseating" are a good way to remember the two families of classical ciphers:

- A substitution cipher **renames**: every letter puts on a new mask, but who appears how often is unchanged;
- A permutation cipher **reseats**: the letters are the same letters, only their positions change, and the appearance counts are unchanged too.

Both therefore preserve the statistical fingerprint of the letters, only in different ways. Genuine modern encryption must scramble both "names" and "statistics", so that the ciphertext looks like a uniformly random bit string.

| Cipher | Key space | Resists brute force | Resists frequency analysis | Fatal weakness |
|---|---|---|---|---|
| Caesar | 25 | Very weak | Very weak | Too few keys |
| Affine | 312 | Weak | Weak | Still a monoalphabetic substitution |
| Monoalphabetic | $26!\approx 4\times 10^{26}$ | Strong | Very weak | Frequency fingerprint unchanged |
| Vigenère | $26^l$ | Grows with $l$ | Moderate | Key period leaks |
| One-time pad | $26^n$ | Not enumerable | Immune | Key distribution and reuse |

Approximate English letter frequencies: E 12.7%, T 9.1%, A 8.2%, O 7.5%, I 7.0%, N 6.7%, S 6.3%, H 6.1%, R 6.0%. These leading letters are the "first team" of frequency analysis.

> Intuition: monoalphabetic substitution is like changing the whole class into new uniforms—the faces are the same faces; Vigenère is like changing the uniform every few people, so a single person cannot be recognised, but if you know the cycle of the change and line up everyone in the same uniform, the faces show again.

> And the one-time pad: it is perfect not because the algorithm is complicated, but because the key itself is a truly random string as long as the plaintext. To the attacker, the ciphertext $c=m\oplus k$ is such that for every candidate plaintext $m'$ there is a unique $k'=c\oplus m'$ with $c=m'\oplus k'$. Every plaintext is equally likely, so the posterior naturally equals the prior.

## 5. Worked Examples

### Example 1 (basic: encryption, decryption and a known-plaintext attack on the affine cipher)

Problem: Take the affine cipher $c=(5m+8)\bmod 26$. (1) Encrypt "HELLO"; (2) decrypt "RCLLA"; (3) given that plaintext E encrypts to C and H encrypts to R, recover the key.

Analysis: First convert the letters to integers $0\sim 25$ (A=0, B=1, …, Z=25), compute by the formula, then convert back. Decryption requires the modular inverse of $a$.

Solution: (1) Compute one by one.

- H is $7$: $5\times 7+8=43$, $43-26=17$, which is R;
- E is $4$: $5\times 4+8=28$, $28-26=2$, which is C;
- L is $11$: $5\times 11+8=63$, $63-52=11$, which is L;
- the second L is also L;
- O is $14$: $5\times 14+8=78$, $78-78=0$, which is A.

So the ciphertext is "RCLLA".

(2) First find the modular inverse of $5$. Since $5\times 21=105=4\times 26+1$, we have $5^{-1}\equiv 21\pmod{26}$. The decryption formula is

$$m\equiv 21(c-8)\pmod{26}.$$

For R ($c=17$): $21\times(17-8)=21\times 9=189$, $189-7\times 26=189-182=7$, giving H. For C ($c=2$): $21\times(2-8)=21\times(-6)=-126$, and $-126+5\times 26=-126+130=4$, giving E. For L ($c=11$): $21\times 3=63\equiv 11$, giving L. For A ($c=0$): $21\times(-8)=-168$, $-168+7\times 26=14$, giving O. Together this is exactly "HELLO".

(3) Write the given conditions as congruences:

$$4a+b\equiv 2,\qquad 7a+b\equiv 17\pmod{26}.$$

Subtracting gives $3a\equiv 15\pmod{26}$. Since $\gcd(3,26)=1$ and the inverse of $3$ is $9$ ($3\times 9=27\equiv 1$), multiplying both sides by $9$ gives $a\equiv 135\equiv 5\pmod{26}$. Substituting back into the first equation: $20+b\equiv 2$, so $b\equiv -18\equiv 8\pmod{26}$, consistent with the given problem.

Comment: two known plaintext–ciphertext pairs uniquely determine the affine key, which shows that the 312 keys of the affine cipher are worthless against a known-plaintext attack—the attacker needs only two successful guesses.

### Example 2 (advanced: a position-by-position Vigenère computation)

Problem: Encrypt the plaintext "ATTACKATDAWN" with the key "KEY", write out the full computation, and explain how to determine the key length using the index of coincidence.

Analysis: Convert KEY to $(10,4,24)$ and use it cyclically; add modulo 26 at each position.

Solution: Align plaintext and key:

| Position | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Plaintext | A | T | T | A | C | K | A | T | D | A | W | N |
| Value | 0 | 19 | 19 | 0 | 2 | 10 | 0 | 19 | 3 | 0 | 22 | 13 |
| Key | K | E | Y | K | E | Y | K | E | Y | K | E | Y |
| Value | 10 | 4 | 24 | 10 | 4 | 24 | 10 | 4 | 24 | 10 | 4 | 24 |
| Ciphertext | K | X | R | K | G | I | K | X | B | K | A | L |

Spot-check three positions: position 2 is $19+4=23$, which is X; position 3 is $19+24=43$, $43-26=17$, which is R; position 9 is $3+24=27$, $27-26=1$, which is B. The rest follow the same pattern. The ciphertext is "KXRKGIXKBKAL".

Decryption simply subtracts in reverse: position 3, R, is $17$; subtracting the key $24$ gives $-7$, adding $26$ gives $19$, which is T.

How is the key length determined? Split the ciphertext into $l$ columns for candidate period $l$ and compute the $\mathrm{IC}$ of each column. When $l$ is correct, each column is a single Caesar shift, the letter distribution is still the English distribution, and $\mathrm{IC}$ is about $0.066$; when $l$ is wrong, a column mixes letters shifted by different amounts, the distribution is smeared out, and $\mathrm{IC}$ drops to around $0.038$. Take the $l$ that maximises the average $\mathrm{IC}$, and cross-check with the Kasiski test (looking for repeated trigrams and the common factors of their spacings).

Comment: Vigenère does not abolish statistical regularity; it merely pushes it from "the whole text" to "each column". Once the period is found, the cipher degrades into a pile of Caesar ciphers.

### Example 3 (challenge: why one-time pad reuse collapses completely)

Problem: The key $k=(7,7,7,7)$ is used to encrypt two messages "MATH" and "LENS" (A=0). Find the two ciphertexts and their XOR, and explain what the attacker obtains.

Analysis: A one-time pad requires the key to be used only once. Here it is reused, so the key cancels in the XOR.

Solution: Convert the letters to numbers:

- "MATH" $=(12,0,19,7)$;
- "LENS" $=(11,4,13,18)$.

Encrypt position by position (mod 26):

$$c_1=(12+7,\ 0+7,\ 19+7,\ 7+7)=(19,7,0,14)=\text{THAO},$$

$$c_2=(11+7,\ 4+7,\ 13+7,\ 18+7)=(18,11,20,25)=\text{SLUZ}.$$

Subtract the two ciphertexts position by position:

$$c_1-c_2=(19-18,\ 7-11,\ 0-20,\ 14-25)=(1,-4,-20,-11)\equiv(1,22,6,15)\pmod{26}.$$

The difference of the plaintexts is

$$m_1-m_2=(12-11,\ 0-4,\ 19-13,\ 7-18)=(1,-4,6,-11)\equiv(1,22,6,15)\pmod{26}.$$

The two are identical, and the key $7$ has completely cancelled. What the attacker obtains is $m_1-m_2$, the position-by-position difference of the two plaintexts. The redundancy of English makes that difference very hard to disguise: the attacker can enumerate the first letter of $m_1$, deduce the first letter of $m_2$, score with a language model, and recover both plaintexts within a few steps. Worse, once either one is guessed (say from a known message format), the other is immediately determined.

Comment: the trap here is that "key length equal to plaintext length and a completely random key" looks impregnable. But the proof of perfect secrecy uses "the key is used only once"; after reuse the condition fails and the proof collapses instantly. In engineering one must never reuse a key merely because it is long.

## 6. Common Errors and Pitfalls

- Error: conflating permutation ciphers with substitution ciphers. Correction: permutation changes only positions, substitution only letters; the former's key is a permutation, the latter's a bijection on the alphabet.
- Error: thinking a large key space means security. Correction: monoalphabetic substitution has $26!$ keys yet falls easily to frequency analysis; security depends on whether the ciphertext leaks structural information about the plaintext, not on the number of keys.
- Error: choosing $a$ arbitrarily in the affine cipher. Correction: $\gcd(a,26)=1$ is required, otherwise the map is not a bijection and cannot be decrypted; there are only 12 admissible $a$.
- Error: using a very short key word with Vigenère for a long time. Correction: a short key means a short period, and the Kasiski test and $\mathrm{IC}$ pin down the period quickly; the key should be at least as long as the plaintext and truly random to approach a one-time pad.
- Error: treating Base64 or URL encoding as encryption. Correction: they have no key, are merely reversible encodings that anyone can undo, and provide no confidentiality.
- Error: thinking a one-time pad is secure as long as the key is long and therefore reusing it. Correction: reuse leaks the XOR of two plaintexts, and no key length helps; "once" is a hard requirement.
- Error: encrypting several messages with the same key without a nonce. Correction: deterministic encryption makes identical plaintexts produce identical ciphertexts, letting the attacker conclude "these two transfers are for the same amount".

## 7. Summary and Mnemonics

Key points reviewed:

- A cryptosystem must satisfy correctness $D_k(E_k(m))=m$, and encryption must be a bijection;
- The Caesar cipher has only 25 non-trivial keys, the affine cipher 312, and monoalphabetic substitution $26!$;
- Permutation changes positions, substitution changes letters; both preserve the frequency fingerprint and therefore both fear frequency analysis;
- The index of coincidence $\mathrm{IC}=\sum n_i(n_i-1)/[n(n-1)]$ distinguishes the "English distribution" from the "uniform distribution" and is the sharp tool for determining the key period;
- Vigenère smears the frequencies into each column, but once the period is exposed it degrades into several Caesar ciphers;
- Perfect secrecy requires $P(M=m\mid C=c)=P(M=m)$, equivalent to keys that are equiprobable, no shorter than the plaintext, and used only once.

Mnemonic: **"Renaming and reseating leave frequencies intact; once the period shows, all is exposed; however long, a key resists reuse—only the one-time pad truly works."**`,
    keyPoints: [
      'Correctness of a cryptosystem: D_k(E_k(m))=m, so encryption must be a bijection',
      'Permutation changes positions and substitution changes letters; both preserve the letter frequency fingerprint',
      'The affine cipher requires gcd(a,26)=1, giving 312 valid keys in total',
      'The index of coincidence separates the English distribution from the uniform one and reveals the Vigenère period',
      'Perfect secrecy requires equiprobable keys, no shorter than the plaintext, used only once',
    ],
  },
  'block-ciphers': {
    chapter: 'Chapter 2 Symmetric Encryption',
    title: 'Block Ciphers and Modes of Operation',
    summary:
      'How does AES churn 128 bits into an unreadable mess? And why are ECB, CBC and CTR progressively more careful?',
    content: String.raw`

Modern encryption no longer works letter by letter; it cuts data into fixed-length "blocks" and encrypts a whole block at a time. AES has a block length of 128 bits, i.e. 16 bytes. Think of it as a mincing machine: throw in 16 bytes of plaintext plus a key, and out comes 16 bytes of ciphertext with no discernible pattern.

But problems appear at once. First, the machine can only handle exactly 16 bytes, while real files come in all sizes: a 3 MB photo, a 20-byte chat message—how are they cut and padded? Second, if the same machine with the same settings is used every time, identical plaintext blocks mince into identical ciphertext blocks. The attacker then needs no decryption: merely seeing that "the same ciphertext block appears at the same position in two images" reveals what kind of image it is. The famous ECB penguin picture comes from exactly this: even after encryption the penguin's outline stays clearly visible.

Third, if each block is given a little "random seasoning", how does the receiver know how much was added and in what order to undo it? These questions correspond respectively to **padding**, **modes of operation** and **initialisation vectors**. They are not part of the AES algorithm itself, yet they decide whether AES in a real system is an iron wall or a sheet of window paper.

Opening question: even if a block cipher is mathematically flawless, why is it still unsafe to encrypt a file with it directly? The answer lies in the "mode"—the algorithm only scrambles one block; the mode is responsible for chaining many blocks together safely.

## 2. Rigorous Definitions

**Definition (block cipher)**. A block cipher consists of a key space $\mathcal{K}$, a block space $\{0,1\}^n$ and a family of functions $E_k:\{0,1\}^n\to\{0,1\}^n$. For each $k$, $E_k$ must be a bijection, with $D_k=E_k^{-1}$. An ideal $E_k$ should be a pseudorandom permutation (PRP): anyone without $k$ cannot distinguish it from a randomly chosen permutation. AES takes $n=128$ with key lengths of 128, 192 or 256 bits and 10, 12 or 14 rounds respectively.

**Definition (Feistel structure)**. Split a $2n$-bit block into left and right halves $L_0,R_0$; round $i$ does

$$L_i=R_{i-1},\qquad R_i=L_{i-1}\oplus F(R_{i-1},K_i),$$

where $F$ is an arbitrary (not necessarily invertible) round function. Decryption starts from $(L_r,R_r)$ and uses the same $K_i$ in reverse:

$$R_{i-1}=L_i,\qquad L_{i-1}=R_i\oplus F(L_i,K_i).$$

DES is a 16-round Feistel cipher with a 64-bit block and a 56-bit key, and is no longer secure today.

**Definition (substitution–permutation network, SPN)**. Each round performs in turn: round-key XOR, a nonlinear substitution (S-box), and linear mixing (row shift and column mix). One AES round is SubBytes, ShiftRows, MixColumns, AddRoundKey; the last round omits MixColumns. The S-box is not an arbitrary table: it views the byte as an element of $\mathbb{F}_{2^8}$ and takes its multiplicative inverse ($0$ maps to $0$), then applies an affine transformation, which makes it easy to analyse mathematically and resistant to differential and linear cryptanalysis in implementation.

**Definition (modes of operation)**. Let the plaintext be cut into $P_1,\dots,P_m$ with each $P_i\in\{0,1\}^n$.

- ECB (electronic codebook): $C_i=E_k(P_i)$, each block independent.
- CBC (cipher block chaining): take a random initialisation vector $IV$ and set $C_0=IV$,

$$C_i=E_k(P_i\oplus C_{i-1}).$$

- CTR (counter): take a random number $N$ and set

$$C_i=P_i\oplus E_k(N+i).$$

- GCM: CTR encryption plus GHASH authentication, a form of authenticated encryption (AEAD) guaranteeing both confidentiality and integrity.

**Definition (PKCS#7 padding)**. If the block length is $B$ bytes and the last plaintext block is missing $t$ bytes ($1\le t\le B$), append $t$ bytes each of value $t$. If the plaintext is exactly a whole number of blocks, append an extra whole block of $B$ bytes each of value $B$, so the receiver can remove the padding unambiguously.

**Definition (birthday bound)**. For $n$-bit blocks, if $q$ blocks are generated at random the collision probability is about $q^2/2^{n+1}$. When $q\approx 2^{n/2}$ the probability approaches one half. For $n=128$ one only needs to worry after $2^{64}$ blocks, far beyond any practical file.

## 3. Why Define It This Way

**Why may $F$ be non-invertible in a Feistel structure?** Because decryption never needs the inverse of $F$. Look at the decryption formulas: $R_{i-1}=L_i$ directly recovers the right half, and $L_{i-1}=R_i\oplus F(L_i,K_i)$ only recomputes $F$. $F$ appears solely as an "XOR mask", and XORing twice cancels it. The beauty of the design is that $F$ can be made arbitrarily complex and nonlinear without worrying about invertibility. DES relied on exactly this to obtain sufficient confusion from simple hardware.

**Why does AES use an SPN rather than Feistel?** Each SPN round substitutes and mixes the whole block, so diffusion is faster. Shannon proposed two design criteria: **confusion** (make the relation between key and ciphertext too complex to analyse bit by bit) and **diffusion** (make every plaintext bit affect many ciphertext bits). AES's MixColumns multiplies a column of 4 bytes by an invertible matrix, spreading a change in one byte across the whole column; ShiftRows then scatters columns across different rows. After ten rounds, any plaintext bit affects almost all ciphertext bits.

**Why is ECB unsafe?** Because it is deterministic: identical plaintext blocks always give identical ciphertext blocks, and blocks have no relation to each other. The attacker cannot crack a single block, but can see "block 3 equals block 17" and "the block distribution of this image outlines a face". What leaks is structural information, and structural information is often more damaging than content. Formally, ECB is not semantically secure: given two messages of equal length, the attacker can tell which one was encrypted (compare a message with repeated identical blocks against a random one).

**Why does CBC need a random IV?** CBC's chaining makes $C_i$ depend on all preceding blocks, solving "identical plaintext block gives identical ciphertext". But if the $IV$ is fixed, encrypting the same file twice still gives identical results and the attacker can still tell "whether these two files are the same". The IV must be random and unpredictable; it need not be secret, but it must differ every time. CBC has another cost: encryption cannot be parallelised ($C_i$ depends on $C_{i-1}$), whereas decryption can, since $P_i=D_k(C_i)\oplus C_{i-1}$.

**Why must CTR never reuse a nonce?** Because CTR turns the block cipher into a stream cipher, with key stream $E_k(N),E_k(N+1),\dots$. If the same $N$ is used twice, the two messages share the same key stream, and XORing cancels it:

$$C_1\oplus C_2=P_1\oplus P_2.$$

This is the same mistake as reusing a one-time pad key, with equally serious consequences. CTR's advantages are that it can be parallelised and can access any block at random (suitable for disk encryption), provided the counter never wraps and the nonce never repeats.

**Why must padding be unambiguous?** If only "zero padding" were used, the receiver could not distinguish "the plaintext genuinely ends in zeros" from "these zeros are padding". PKCS#7 makes the padding byte value equal to the padding length; the receiver reads the last byte $t$, checks that the last $t$ bytes all equal $t$, and recovers uniquely. If the plaintext is exactly a whole number of blocks, an extra block must be appended, otherwise the receiver would mistake a genuine last byte of the plaintext for the padding length.

## 4. Intuition and Pictures

Think of the block cipher as a "blender" and the mode of operation as the "order of loading":

| Mode | Encryption formula | Parallelisable | Source of randomness | Main risk |
|---|---|---|---|---|
| ECB | $C_i=E_k(P_i)$ | Yes | None | Identical blocks leak structure |
| CBC | $C_i=E_k(P_i\oplus C_{i-1})$ | No | Random IV | IV reuse, padding oracle |
| CTR | $C_i=P_i\oplus E_k(N+i)$ | Yes | Random nonce | Nonce reuse |
| GCM | CTR + GHASH | Yes | Random nonce | Nonce reuse, authentication failure |

> Intuition: ECB is like labelling every drawer—the labels change but the contents sit in exactly the same places; CBC is like chaining each drawer's lock to the previous one, so disturbing one throws everything off; CTR is like covering the data bit by bit with a one-off random paper tape that must never be used twice.

CBC's error propagation is also worth remembering:

- A 1-bit error in ciphertext block $C_i$ makes about half the bits of $P_i$ wrong (avalanche), while $P_{i+1}$ suffers a 1-bit error at the corresponding position, and all later blocks are unaffected;
- Conversely, if $C_i$ is lost entirely, all subsequent blocks are misaligned because the chain is broken.

CTR is the opposite: flipping one bit affects only the corresponding plaintext bit, with no spread to other positions. This "no error propagation" is an advantage for storage but a disadvantage when integrity is needed, so real systems often use authenticated modes such as GCM.

## 5. Worked Examples

### Example 1 (basic: one Feistel round by hand)

Problem: Block length 8 bits, $L_0=0110$, $R_0=1001$, round function $F(R,K)=R\oplus K$. (1) Do one round with $K_1=1100$ and find $(L_1,R_1)$; (2) do another round with $K_2=1010$; (3) verify that decryption recovers the input.

Analysis: Follow $L_i=R_{i-1}$ and $R_i=L_{i-1}\oplus F(R_{i-1},K_i)$ exactly, remembering that every step is a bitwise XOR.

Solution: (1) First round:

$$F(R_0,K_1)=1001\oplus 1100=0101,$$

$$L_1=R_0=1001,\qquad R_1=L_0\oplus F=0110\oplus 0101=0011.$$

(2) Second round:

$$F(R_1,K_2)=0011\oplus 1010=1001,$$

$$L_2=R_1=0011,\qquad R_2=L_1\oplus F=1001\oplus 1001=0000.$$

(3) Decryption starts from $(L_2,R_2)=(0011,0000)$. First restore the output of the first round:

$$R_1=L_2=0011,\qquad L_1=R_2\oplus F(L_2,K_2)=0000\oplus(0011\oplus 1010)=1001.$$

Then restore the initial state:

$$R_0=L_1=1001,\qquad L_0=R_1\oplus F(L_1,K_1)=0011\oplus(1001\oplus 1100)=0011\oplus 0101=0110.$$

We get $(0110,1001)$, matching the initial values.

Comment: the whole decryption never uses the inverse of $F$, only the fact that "XORing twice changes nothing". That is why a Feistel structure is invertible even when $F$ is not.

### Example 2 (advanced: CBC chaining and error propagation)

Problem: Block length 4 bits, simplified block cipher $E_k(x)=x\oplus k$ with $k=1100$ and $IV=0011$. Plaintext $P_1=1010$, $P_2=0110$. (1) Find $C_1,C_2$; (2) verify by decryption; (3) if the first bit of $C_1$ is flipped, analyse the change in $P_1,P_2$.

Analysis: CBC encryption is "XOR with the previous ciphertext block, then encrypt"; decryption is "decrypt, then XOR with the previous ciphertext block".

Solution: (1) First block:

$$C_1=E_k(P_1\oplus IV)=(1010\oplus 0011)\oplus 1100=1001\oplus 1100=0101.$$

Second block:

$$C_2=E_k(P_2\oplus C_1)=(0110\oplus 0101)\oplus 1100=0011\oplus 1100=1111.$$

(2) Decryption:

$$P_1=D_k(C_1)\oplus IV=(0101\oplus 1100)\oplus 0011=1001\oplus 0011=1010,$$

$$P_2=D_k(C_2)\oplus C_1=(1111\oplus 1100)\oplus 0101=0011\oplus 0101=0110.$$

matching the plaintext.

(3) Change $C_1$ to $1101$ (first bit flipped). Decrypting $P_1$:

$$D_k(1101)\oplus IV=(1101\oplus 1100)\oplus 0011=0001\oplus 0011=0010,$$

which differs from the original $1010$ in two bits (the first and the third). Decrypting $P_2$:

$$D_k(C_2)\oplus C_1'=0011\oplus 1101=1110,$$

which differs from the original $0110$ in the first bit only.

Comment: one bit error in $C_1$ is amplified in $P_1$ (because of the avalanche effect of $D_k$), yet leaves only a 1-bit error at the same position in $P_2$ (because only an XOR happens there). Later blocks are unaffected. This explains why a single damaged ciphertext block in CBC usually ruins only two plaintext blocks.

### Example 3 (challenge: CTR nonce reuse and the birthday bound)

Problem: (1) Two 6-byte messages "ATTACK" and "DEFEND" are encrypted in CTR mode with the same nonce; find the XOR of the two ciphertexts. (2) For 128-bit blocks, estimate the probability of a block collision if $2^{32}$ blocks are encrypted.

Analysis: A CTR ciphertext is the XOR of plaintext and key stream; the same nonce means the same key stream, which cancels in the XOR. The collision probability follows the birthday approximation $q^2/2^{n+1}$.

Solution: (1) Write the characters as hexadecimal ASCII: A=41, T=54, C=43, K=4B, D=44, E=45, F=46, N=4E. Hence

$$P_1=(41,54,54,41,43,4B),\qquad P_2=(44,45,46,45,4E,44).$$

XOR byte by byte:

$$41\oplus 44=05,\quad 54\oplus 45=11,\quad 54\oplus 46=12,$$
$$41\oplus 45=04,\quad 43\oplus 4E=0D,\quad 4B\oplus 44=0F.$$

So $C_1\oplus C_2=(05,11,12,04,0D,0F)$, which contains no information about the key stream—it has been completely cancelled. What the attacker has is $P_1\oplus P_2$; guessing one plaintext immediately determines the other. If the plaintext is English, every byte of $P_1\oplus P_2$ falls within printable characters, and simple frequency analysis recovers both.

(2) With $q=2^{32}$ and $n=128$:

$$P\approx\frac{q^2}{2^{n+1}}=\frac{2^{64}}{2^{129}}=2^{-65}\approx 2.7\times 10^{-20}.$$

This probability is negligible. Even encrypting $2^{40}$ blocks gives about $2^{80-129}=2^{-49}$, still extremely small. The real risk is not random collision but deliberate nonce reuse: as soon as the same $(k,N)$ is used twice, security drops to zero.

Comment: the trap here is that "CTR can be parallelised and randomly accessed" makes it feel casual. In fact CTR is stricter about the nonce than CBC is about the IV: a repeated CBC IV only reveals "whether the two plaintexts begin identically", whereas a repeated CTR nonce reveals the XOR of the whole plaintext.

## 6. Common Errors and Pitfalls

- Error: encrypting files or database fields with AES-ECB directly. Correction: ECB is deterministic, identical plaintext blocks give identical ciphertext blocks and leak data structure and repetition patterns; use at least CBC with a random IV, or CTR/GCM with a random nonce.
- Error: a fixed or predictable CBC IV. Correction: the IV must be freshly random each time; a fixed IV makes identical files encrypt identically, and a predictable IV enables BEAST-style attacks.
- Error: counter wrap-around or nonce repetition in CTR mode. Correction: the nonce must be globally unique and the counter space large enough; one reuse publishes the XOR of two plaintexts.
- Error: padding with zeros only. Correction: zero padding is ambiguous; use a self-describing padding such as PKCS#7, and guard against padding oracle attacks by never revealing "whether the padding was valid" on failure.
- Error: assuming encryption automatically guarantees integrity. Correction: neither CBC nor CTR resists tampering; an attacker can flip ciphertext bits and thereby controllably flip plaintext bits; use GCM or encrypt-then-MAC when authentication is needed.
- Error: keeping the IV secret as if it were a key. Correction: the IV is a public parameter that need not be secret, but it must be unpredictable and unique; the only real secret is the key.
- Error: believing 128-bit blocks never collide. Correction: the birthday bound is $2^{64}$ blocks; even though real files cannot reach it, protocol design must estimate against this limit and never assume "no collision ever".

## 7. Summary and Mnemonics

Key points reviewed:

- A block cipher is a family of pseudorandom permutations; AES uses an SPN structure with a 128-bit block;
- The Feistel round function need not be invertible; decryption works by cancelling two XORs;
- ECB is deterministic and leaks patterns; CBC chains blocks with a random IV, so encryption cannot be parallelised but decryption can;
- CTR turns a block cipher into a stream cipher, and the nonce must never be reused;
- PKCS#7 padding removes ambiguity with a length value, and a whole block requires an extra block;
- The birthday bound $q^2/2^{n+1}$ governs block collision risk, about $2^{64}$ blocks at 128 bits.

Mnemonic: **"ECB shows the shape, CBC chains the links; CTR counts, so never reuse a nonce; padding looks at the tail, authentication stops the tampering."**`,
    keyPoints: [
      'A block cipher is a pseudorandom permutation; AES uses an SPN structure with a 128-bit block',
      'The Feistel round function need not be invertible; decryption cancels by XOR',
      'ECB is deterministic and leaks patterns; CBC requires a random, unpredictable IV',
      'The CTR nonce must never be reused, otherwise the key stream cancels',
      'PKCS#7 padding removes ambiguity with a length value and adds a whole extra block when the input is block-aligned',
    ],
  },
  'hash-functions': {
    chapter: 'Chapter 3 Hash Functions',
    title: 'Hash Functions and Message Authentication',
    summary:
      'Compress a message of any length into a fixed-length fingerprint: how the three security properties strengthen one by one, and why the birthday attack needs only half the effort.',
    content: String.raw`

You download an installer from the internet and the site shows "SHA-256: 3f7a…". How do you know the downloaded file has not been tampered with? You need not compare the whole file byte by byte; you simply compute the hash locally and check whether it matches the string on the site. A hash function is the fingerprint of a file: change one bit of the content and the fingerprint changes beyond recognition; leave the content alone and the fingerprint is always the same.

But the "fingerprint" metaphor hides several questions that must be asked. First, can the file be recovered from the fingerprint? If not, how does it differ from "encryption"? Second, can two different files be found with the same fingerprint? If so, signatures, certificates and blockchain ownership proofs all collapse. Third, could the fingerprint on the website itself be replaced by a man in the middle? If so, what is the point of comparing fingerprints?

These three questions correspond to the three security properties of a hash function: **preimage resistance**, **second preimage resistance** and **collision resistance**. They sound similar, yet their strength increases in that order, and the corresponding attack costs differ enormously. More subtly, many constructions that look secure (such as appending the key to the front of the message and then hashing) have structural flaws that let an attacker forge a message authentication code without knowing the key.

Opening question: why is "collision resistance" harder to achieve than "not reversible"? Why does finding a collision in a 256-bit hash take only about $2^{128}$ operations rather than $2^{256}$? The answer lies in a counter-intuitive phenomenon in probability—the birthday paradox.

## 2. Rigorous Definitions

**Definition (hash function)**. A hash function is a family of maps $H:\{0,1\}^*\to\{0,1\}^n$ compressing bit strings of arbitrary length into a digest of fixed length $n$. Typically $n$ is 256 (SHA-256) or 512 (SHA-512).

**Definition (the three security properties)**. Let $H$ be a hash function.

1. **Preimage resistance** (one-wayness): given $y=H(x)$, finding any $x'$ with $H(x')=y$ is computationally infeasible.
2. **Second preimage resistance** (weak collision resistance): given $x$, finding $x'\neq x$ with $H(x')=H(x)$ is computationally infeasible.
3. **Collision resistance** (strong collision resistance): finding any pair $x'\neq x$ with $H(x')=H(x)$ is computationally infeasible.

The quantitative standards are usually "at least $2^n$ operations" (the first two) and "at least $2^{n/2}$ operations" (the third). "Computationally infeasible" is not a precise mathematical proposition but an engineering convention: a scheme is deemed secure when the attack cost exceeds what available computing power can afford.

**Definition (birthday attack)**. Randomly select $q$ distinct inputs and compute their digests. If the digests are treated as uniformly random $n$-bit strings, the probability of at least one collision is

$$P(q)\approx 1-\exp\left(-\frac{q(q-1)}{2^{n+1}}\right).$$

For $q\approx 1.177\cdot 2^{n/2}$, $P\approx 1/2$. This is the origin of "an $n$-bit hash has only $n/2$ bits of security".

**Definition (Merkle–Damgård construction)**. Split the message into blocks of length $b$ and pad it, obtaining $M_1,\dots,M_t$. Take a fixed initial vector $h_0$ and iterate the compression function $f$:

$$h_i=f(h_{i-1},M_i),\qquad H(M)=h_t.$$

MD5, SHA-1 and SHA-2 all use this structure. Its advantage: as long as $f$ is collision resistant, so is the whole $H$. Its drawback: the length extension attack.

**Definition (HMAC)**. Given a key $k$ and a hash function $H$,

$$\mathrm{HMAC}(k,m)=H\bigl((k\oplus \mathrm{opad})\,\|\,H((k\oplus \mathrm{ipad})\,\|\,m)\bigr),$$

where ipad and opad are two fixed constant padding strings. The two hash layers separate the inner state from the outer layer, defeating length extension.

**Definition (salting)**. When storing passwords, generate an independent random string $s$ (the salt) for each user and store $(s,H(s\|p))$ rather than $H(p)$. The salt need not be secret but must be unique.

## 3. Why Define It This Way

**Why is preimage resistance not the same as collision resistance?** Because the attack goals differ. A preimage attack is "given a fingerprint, find a person"; collision resistance is "find two people with the same fingerprint". The latter is clearly easier: you need not aim at any particular fingerprint, just find any two that collide. The birthday paradox tells us that among $2^n$ possible fingerprints, trying $2^{n/2}$ at random has a good chance of hitting one. So collision resistance is strictly stronger than second preimage resistance: if a function resists collisions it automatically resists second preimages (otherwise that colliding pair would be a counterexample); the converse fails.

A counterexample is easy to construct. Let $H$ be collision resistant and define

$$H'(x)=\begin{cases}H(0), & x\in\{0,1\},\\ H(x), & \text{otherwise}.\end{cases}$$

$H'$ is obviously not collision resistant, since $0$ and $1$ form a collision that everybody knows. But given any $x\notin\{0,1\}$, finding $x'\neq x$ with $H'(x')=H'(x)$ is still equivalent to breaking $H$, so $H'$ is second-preimage resistant. This shows that "collision resistance" is the more demanding requirement and cannot be derived from the weaker properties.

**Why is the collision bound $2^{n/2}$ rather than $2^n$?** It is pure probability. The $q$ digests form $\binom{q}{2}\approx q^2/2$ pairs, each equal with probability $2^{-n}$. For the expected number of collisions to reach 1 we need $q^2/2\approx 2^n$, i.e. $q\approx 2^{n/2}$. In other words, the attacker is not "guessing one specific value" but "guessing any equal pair", so the search space changes from "a point" to "all pairs", and the cost is naturally square-rooted.

**Why iterate a compression function instead of processing the whole message at once?** Because the message length has no upper bound while hardware registers are finite. Merkle–Damgård reduces "arbitrary length" to "fixed length", processing one block at a time, with the state $h_i$ carrying all earlier information. The theorem guarantees that if $f$ is collision resistant then the iterated $H$ is too. The proof is by contradiction: a collision in $H$ either occurs at the last block (breaking $f$) or has already occurred earlier (recurse), so somewhere $f$ is broken.

**Why can't $H(k\|m)$ serve as a MAC?** Because of the length extension flaw. Knowing the value $h=H(k\|m)$, the attacker also knows the exact internal state after processing $k\|m$ and its padding. He can append arbitrary $m'$ and continue the iteration himself:

$$H(k\|m\|\mathrm{pad}\|m')=f(h,m'),$$

and $f$ is public while $h$ is public too (it is the published MAC). So he forges the valid message–MAC pair $(m\|\mathrm{pad}\|m',\ h')$ without knowing $k$ at all. HMAC blocks this path with a two-layer structure: the outer layer restarts from a fixed initial vector, and what the attacker obtains is the outer output, from which the inner state cannot be recovered.

**Why salt passwords?** Without a salt, identical passwords give identical hashes. The attacker can precompute a large table of "common password → hash" (a rainbow table), computing once and reusing many times; he can also see at a glance which users share a password. With a salt, every user's hash differs, the precomputed table fails, and the attacker must brute-force each salt separately. The salt does not strengthen an individual password, but it turns "break a whole batch at once" into "break one at a time".

## 4. Intuition and Pictures

Think of hashing as a meat grinder: feed in a whole cow or a single sausage and out comes the same fixed-size mince; the mince cannot be reassembled into a cow; but if you can find "cow A and cow B that grind into exactly the same mince", the machine is broken.

| Property | Attacker knows | Attacker must find | Ideal cost |
|---|---|---|---|
| Preimage resistance | $y$ | Any $x$ with $H(x)=y$ | $2^n$ |
| Second preimage resistance | $x$ | $x'\neq x$ with $H(x')=H(x)$ | $2^n$ |
| Collision resistance | Nothing | Any $x\neq x'$ with $H(x)=H(x')$ | $2^{n/2}$ |

> Intuition: preimage is "holding a key and looking for the lock"; collision resistance is "looking for two identical locks in a pile". The latter has no target—just bump around—so it is much faster.

> Birthday paradox: in a class of 23 people the chance that two share a birthday exceeds 50%. It is not that someone shares your birthday; it is that any two do. A hash collision is likewise "any two messages colliding", so the cost drops from $2^n$ to $2^{n/2}$.

The Merkle–Damgård iteration can be drawn as a chain:

$$h_0\xrightarrow{M_1}h_1\xrightarrow{M_2}h_2\xrightarrow{\ \cdots\ }h_{t-1}\xrightarrow{M_t}h_t=H(M).$$

Length extension works because once the attacker has $h_t$ he can use it as a new starting point and keep appending blocks to the right—the chain is open, with no "seal".

## 5. Worked Examples

### Example 1 (basic: comparing the cost of preimage and collision)

Problem: A 64-bit hash is used for file verification. (1) How many attempts does an attacker need to forge a "fake file" for a specified file with the same hash? (2) How many to produce any two files with the same hash? (3) At $10^9$ operations per second, how long does each take?

Analysis: A preimage attack is exhaustive search over $2^{64}$; a collision attack uses the birthday bound $2^{32}$.

Solution: (1) For a fixed target $y$, each random attempt succeeds with probability $2^{-64}$, so the expected number of attempts is $2^{64}$.

(2) A birthday attack needs only about $2^{64/2}=2^{32}$.

(3) Convert to time. $2^{64}\approx 1.845\times 10^{19}$; dividing by $10^9$ gives $1.845\times 10^{10}$ seconds. A year is about $3.156\times 10^7$ seconds, so

$$\frac{1.845\times 10^{10}}{3.156\times 10^7}\approx 585\ \text{years}.$$

Whereas $2^{32}\approx 4.295\times 10^9$, about $4.3$ seconds at $10^9$ per second.

Comment: for the same hash, a preimage takes 585 years but a collision only 4 seconds. This is why 64-bit hashes are entirely unusable for signatures today—not because "reversing" is broken, but because "finding collisions" is too cheap. Security strength must be measured by the shortest plank.

### Example 2 (advanced: quantitative estimate of birthday probability)

Problem: For a 128-bit hash, if an attacker computes $q=2^{40}$ digests, find the probability of at least one collision; and what $q$ gives a probability of 50%?

Analysis: Use $P\approx 1-\exp(-q^2/2^{n+1})$, noting that $2^{n+1}=2^{129}$ for $n=128$.

Solution: $q^2=2^{80}$, so

$$\frac{q^2}{2^{129}}=2^{-49}\approx 1.78\times 10^{-15}.$$

Since $1-e^{-x}\approx x$ for small $x$,

$$P\approx 1.78\times 10^{-15}.$$

This is less likely than winning the top prize twice in a row. For $P=0.5$, set $q^2/2^{129}=\ln 2\approx 0.693$, giving

$$q\approx\sqrt{0.693}\cdot 2^{64.5}\approx 0.833\times 2^{64.5}\approx 1.18\times 2^{64}\approx 2^{64.24}.$$

Comment: $2^{64}$ digests of 16 bytes each amount to about $2^{68}$ bytes, i.e. 256 EB, far beyond the total storage on Earth. So 128-bit hashes are still collision resistant today, but are no longer suitable as a long-term security parameter—Grover's algorithm on a quantum computer would reduce the preimage cost to $2^{64}$.

### Example 3 (challenge: padding, length extension and HMAC)

Problem: (1) A 100-byte message is MD-padded with SHA-256; find the total length after padding and the number of zero bits. (2) Let the compression function be $f(h,m)=(3h+m)\bmod 101$ with initial value $h_0=0$, key $k=5$ and message $m=10$. Find $\mathrm{MAC}=H(k\|m)$; how does an attacker forge $H(k\|m\|\mathrm{pad}\|4)$ without knowing $k$?

Analysis: SHA-256 has a 512-bit block with the original length in the last 64 bits; the padding rule is "append a 1, then some zeros, then the 64-bit length" so that the total length is a multiple of 512.

Solution: (1) 100 bytes $=800$ bits. After appending one bit we have 801 bits; adding $k$ zeros and the 64-bit length requires

$$801+k+64\equiv 0\pmod{512}.$$

$865+k\equiv 0\pmod{512}$, and $865=512+353$, so $k=512-353=159$. The total length is $800+1+159+64=1024$ bits, i.e. 2 blocks.

(2) First compute the MAC:

$$h_1=f(0,5)=5,\qquad h_2=f(5,10)=15+10=25.$$

The published MAC is $25$. Knowing it, the attacker knows it is the internal state after processing $k\|m\|\mathrm{pad}$. He simply computes

$$f(25,4)=3\times 25+4=79,$$

obtaining $H(k\|m\|\mathrm{pad}\|4)=79$ without ever using $k=5$. The receiver verifies with the same key and computes the same 79, so accepts the message with appended content.

Comment: the root of the flaw is that the MAC directly exposes the internal state. HMAC wraps the inner result once more in an outer hash; the attacker obtains the outer output and cannot read the inner state from it, cutting off length extension. In practice use HMAC-SHA256 or SHA-3 and never roll your own $H(k\|m)$.

## 6. Common Errors and Pitfalls

- Error: treating "hashing" as "encryption". Correction: hashing is one-way compression and irreversible; encryption is reversible and must be decryptable. Storing passwords by hashing is "verify only, never restore", not encryption.
- Error: thinking collision resistance and preimage resistance are the same thing. Correction: collision resistance is strictly stronger and costs only $2^{n/2}$; a scheme may resist preimages yet fail on collisions.
- Error: using MD5 or SHA-1 for signatures or certificates. Correction: collisions have actually been constructed for both; switch to SHA-256 or above.
- Error: using $H(k\|m)$ as a message authentication code. Correction: the length extension attack lets an attacker forge without the key; use HMAC or hash $H$ twice.
- Error: hash passwords without a salt. Correction: identical passwords produce identical hashes and rainbow tables break them in bulk; every user needs an independent random salt.
- Error: storing passwords with an ordinary hash instead of a slow one. Correction: SHA-256 is too fast, with GPUs trying billions per second; use intentionally slow, memory-hard algorithms such as bcrypt, scrypt or Argon2.
- Error: using a hash value as a random number or a key. Correction: hash output is deterministic, and if the input is predictable so is the output; keys must come from a cryptographic random number generator.
- Error: seeing "256 bits" and assuming 256 bits of security. Correction: collision strength is only 128 bits, as the birthday bound dictates.

## 7. Summary and Mnemonics

Key points reviewed:

- A hash compresses a message of any length into an $n$-bit digest; the three properties are preimage, second preimage and collision resistance;
- Collision resistance is strictly stronger than second preimage resistance, the counterexample being "one collision manufactured by hand";
- The birthday attack lowers the collision cost to about $2^{n/2}$, the benchmark for all hash security parameters;
- Merkle–Damgård handles arbitrary-length messages by iterated compression but leaves a length-extension gap;
- HMAC seals that gap with an inner and an outer hash, and is the standard message authentication code;
- Password storage needs a unique salt and a slow hash such as bcrypt, scrypt or Argon2.

Mnemonic: **"One-way is hard to reverse, collisions halve the cost; length extension needs HMAC to seal; salt the password, and only slow hashing is safe."**`,
    keyPoints: [
      'The three properties of a hash: preimage resistance, second preimage resistance and collision resistance, the last being the strongest',
      'The birthday attack lowers the collision cost to about 2^(n/2)',
      'The Merkle–Damgård iterative structure is vulnerable to length extension attacks',
      'HMAC blocks length extension with an inner and an outer hash',
      'Password storage must use a unique salt and a slow hash',
    ],
  },
  'rsa': {
    chapter: 'Chapter 4 Public-Key Cryptography',
    title: 'RSA and the Foundations of Number Theory',
    summary:
      'A padlock anyone can snap shut but only you can open—RSA turns "multiplication is easy, factorisation is hard" into the possibility of public-key encryption.',
    content: String.raw`

Before 1976 encryption had an inescapable deadlock: the two communicating parties had to share the same key in advance. But if they have never met, how is the key to be delivered safely? Sending it by courier risks interception; reading it over the telephone risks eavesdropping. This is the key distribution problem.

Whitfield Diffie and Martin Hellman proposed a bold idea: could there be a "public lock"? Alice sends the open padlock to Bob; Bob puts the letter in a box, snaps the lock shut and sends it back—now even Bob cannot open it; only Alice, who holds the key, can. Throughout, the lock travels openly and the key never leaves Alice's hand. In 1977 Rivest, Shamir and Adleman found the mathematical structure that realises this lock, and RSA was born.

The RSA secret lies in an asymmetry: multiplying two large primes together is very easy, but factoring the product back is extremely hard. Given two 1024-bit primes, a single multiplication yields the 2048-bit product; but given that product, factoring it with today's best algorithms and fastest computers would take far longer than the age of the universe. So the "product" may be public while the "factors" must be hidden.

Opening question: since the public key $(n,e)$ is visible to everyone, why can nobody compute the private key $d$ from it? And why must "textbook" RSA (just computing $m^e\bmod n$) be used with padding in real systems?

## 2. Rigorous Definitions

**Definition (Euler's totient and Euler's theorem)**. For a positive integer $n$, $\varphi(n)$ is the number of integers from $1$ to $n$ that are coprime to $n$. If $n=pq$ is the product of two distinct primes, then

$$\varphi(n)=(p-1)(q-1).$$

Euler's theorem states that if $\gcd(a,n)=1$, then

$$a^{\varphi(n)}\equiv 1\pmod n.$$

**Definition (RSA key generation)**.

1. Choose two distinct large primes $p,q$ at random and set $n=pq$;
2. Compute $\varphi(n)=(p-1)(q-1)$;
3. Choose an integer $e$ with $1<e<\varphi(n)$ and $\gcd(e,\varphi(n))=1$;
4. Use the extended Euclidean algorithm to find $d$ such that

$$ed\equiv 1\pmod{\varphi(n)}.$$

The public key is $(n,e)$ and the private key is $d$ (real implementations also store $p,q$ to speed up decryption). The plaintext must be encoded as an integer $0\le m<n$.

**Definition (RSA encryption and decryption)**.

$$c=m^e\bmod n,\qquad m=c^d\bmod n.$$

**Definition (RSA signatures)**. The signer computes $s=m^d\bmod n$ with the private key, and the verifier checks $s^e\bmod n=m$. In practice the message is first hashed and the hash is signed—"hash-then-sign".

**Definition (correctness)**. Since $ed=1+k\varphi(n)$, for $\gcd(m,n)=1$,

$$c^d=m^{ed}=m^{1+k\varphi(n)}=m\cdot\left(m^{\varphi(n)}\right)^k\equiv m\pmod n.$$

The equality still holds even when $m$ and $n$ are not coprime: if $p\mid m$ then $m^{ed}\equiv 0\equiv m\pmod p$, while modulo $q$ Euler's theorem applies, and the Chinese remainder theorem combines the two.

**Definition (the RSA hard problem)**. Given $(n,e)$ and $c=m^e\bmod n$, find $m$; this is the RSA problem. It is known that factoring $n$ yields $\varphi(n)$ and hence $d$, so factoring $\Rightarrow$ breaking RSA; whether the converse is equivalent remains open, but RSA's security is generally held to rest on the difficulty of factoring.

**Definition (OAEP padding)**. Before encryption the plaintext $m$ is expanded to

$$m'=m\oplus \mathrm{H}(\mathrm{seed})\ \|\ \mathrm{seed}\oplus \mathrm{G}(m\oplus \mathrm{H}(\mathrm{seed})),$$

where $\mathrm{H},\mathrm{G}$ are hash functions. The padding introduces randomness, so the same plaintext encrypts differently each time. Signatures commonly use PSS padding.

## 3. Why Define It This Way

**Why must $n$ be the product of two primes?** Because we need a structure where "knowing the factors lets you compute $\varphi(n)$, not knowing them does not". If $n$ is prime, $\varphi(n)=n-1$ and anyone can compute it, exposing the private key at once; if $n$ has many small factors, factoring is too easy. Taking the product of two large primes neither exposes $\varphi(n)$ nor makes factoring easy. This also explains why $p$ and $q$ must differ: if $p=q$ then $n=p^2$ and a square root reveals $p$.

**Why require $\gcd(e,\varphi(n))=1$?** Because only then is $e$ invertible modulo $\varphi(n)$ and $d$ exists. Counterexample: take $p=7,q=11$, so $\varphi=60$; if $e=15$ then $\gcd(15,60)=15$ and the congruence $15d\equiv 1\pmod{60}$ has no solution—the left side is always a multiple of 15 and can never leave remainder 1. In practice a bad $e$ makes key generation fail outright.

**Why does decryption always restore the plaintext?** The key is to "reduce the dimension" of the exponentiation to the multiplicative group modulo $\varphi(n)$. Since $ed$ equals 1 modulo $\varphi(n)$, $m^{ed}=m\cdot(m^{\varphi(n)})^k$, and the bracketed part equals 1 by Euler's theorem. The whole proof uses one group-theoretic fact: the order of an element divides the order of the group.

**Why is $e$ often 65537?** It is prime, its binary form $10000000000000001$ has only two 1s, so modular exponentiation needs very few multiplications and encryption is fast; at the same time it is large enough to avoid the small-exponent attack that afflicts $e=3$. Choosing $e=3$ is faster still but demands stricter padding. Note that a small $e$ does not by itself weaken RSA: with correct padding, $e=3$ remains secure.

**Why can textbook RSA not be used directly?** It has three fatal defects.

First, determinism. The same plaintext always encrypts to the same ciphertext, so an attacker can tell "whether these two messages are equal"; it is not semantically secure.

Second, multiplicativity. If $s_1=m_1^d$ and $s_2=m_2^d$, then

$$s_1s_2\bmod n=(m_1m_2)^d\bmod n,$$

so the attacker can forge a signature on $m_1m_2$ without the private key. This is called existential forgery.

Third, small messages can be root-extracted. If $m^e<n$ then $c=m^e$ holds over the integers, and taking the $e$-th root directly recovers $m$—the modular reduction never took effect. For example with $n=3233$, $e=3$, $m=10$, the ciphertext $1000$ has cube root $10$ at a glance.

**Why hash before signing?** First, the message may be longer than $n$ and must be compressed into the modulus range; second, hashing destroys multiplicativity—$H(m_1)H(m_2)$ bears no relation to $H(m_1m_2)$, so multiplicative forgery fails; third, hashing provides collision resistance, preventing an attacker from constructing two different messages with the same hash. Signing a long message "block by block" also invites block reordering and truncation attacks.

## 4. Intuition and Pictures

Think of RSA as a safe with a mail slot: anyone can drop a letter in (public-key encryption), but only the owner can open it (private-key decryption). More precisely, it is a **trapdoor one-way function**: the forward computation $m\mapsto m^e$ is easy, the reverse $c\mapsto c^d$ is hard without the trapdoor $d$, and $d$ is manufactured from the secret $p,q$.

| Dimension | Symmetric encryption | RSA public-key encryption |
|---|---|---|
| Keys | Both sides share one key | Public key open, private key secret |
| Speed | Fast (AES reaches GB/s) | Slow (orders of magnitude slower than AES) |
| Use | Bulk data encryption | Key exchange, signatures, small data |
| Security basis | Pseudorandom permutation | Hardness of integer factorisation |
| Key distribution | Needs a secure channel | The public key can be sent openly |

> Intuition: RSA is "mail the lock out and keep the key at home". But the lock must be disposable and carry a random serial number (padding); otherwise the same letter looks identical every time it is locked, and others can see that you sent several identical letters.

> Another analogy: factoring $n$ is like separating a large heap of two colours of sand that have been mixed. Mixing takes a second; separating requires picking grain by grain. RSA's whole security boundary is the difficulty of this "sand separation" step.

## 5. Worked Examples

### Example 1 (basic: the full flow of RSA with small primes)

Problem: Take $p=7$, $q=11$, $e=13$ and plaintext $m=5$. (1) Find $n,\varphi(n),d$; (2) encrypt and write out the square-and-multiply steps of the modular exponentiation; (3) verify by decryption.

Analysis: First compute $n$ and $\varphi$, then find $d$ by the extended Euclidean algorithm, and finally compute the modular exponentiation by repeated squaring.

Solution: (1) $n=7\times 11=77$ and $\varphi(n)=6\times 10=60$. Find the inverse of $13$ mod $60$: $13\times 37=481=8\times 60+1$, so $d=37$.

(2) Compute $c=5^{13}\bmod 77$. Write 13 in binary as $1101=8+4+1$ and square repeatedly:

$$5^2=25,\qquad 5^4=25^2=625\equiv 625-8\times 77=9,$$
$$5^8=9^2=81\equiv 4.$$

Hence

$$5^{13}=5^8\cdot 5^4\cdot 5^1\equiv 4\times 9\times 5=180\equiv 180-2\times 77=26.$$

The ciphertext is $c=26$.

(3) Decrypt $26^{37}\bmod 77$. With $37=32+4+1$, square first:

$$26^2=676\equiv 676-8\times 77=60,$$
$$26^4=60^2=3600\equiv 3600-46\times 77=58,$$
$$26^8=58^2=3364\equiv 3364-43\times 77=53,$$
$$26^{16}=53^2=2809\equiv 2809-36\times 77=37,$$
$$26^{32}=37^2=1369\equiv 1369-17\times 77=60.$$

Therefore

$$26^{37}=26^{32}\cdot 26^4\cdot 26\equiv 60\times 58\times 26.$$

First $60\times 58=3480\equiv 3480-45\times 77=15$, then $15\times 26=390\equiv 390-5\times 77=5$. We recover $m=5$.

Comment: the small-prime example exposes every step, but $n=77$ factors in a second and offers no security. Real RSA uses $n$ of at least 2048 bits; the computation is identical, only the numbers are far larger.

### Example 2 (advanced: key generation and encryption with realistic-scale parameters)

Problem: Take $p=61$, $q=53$, $e=17$. (1) Find $n$ and $\varphi(n)$; (2) find $d$ by the extended Euclidean algorithm; (3) encrypt $m=65$; (4) explain why $\varphi(n)$ must not be revealed.

Analysis: These are the standard teaching parameters for RSA; $n$ is only 3233, but the flow matches industrial implementations.

Solution: (1) $n=61\times 53=3233$ and $\varphi(n)=60\times 52=3120$.

(2) Apply Euclid to $3120$ and $17$:

$$3120=183\times 17+9,\qquad 17=1\times 9+8,\qquad 9=1\times 8+1.$$

Back-substituting:

$$1=9-8=9-(17-9)=2\times 9-17,$$
$$=2(3120-183\times 17)-17=2\times 3120-367\times 17.$$

So $-367\times 17\equiv 1\pmod{3120}$, i.e.

$$d\equiv -367\equiv 3120-367=2753\pmod{3120}.$$

(3) Compute $65^{17}\bmod 3233$. With $17=16+1$, square repeatedly:

$$65^2=4225\equiv 992,\qquad 65^4=992^2=984064\equiv 1232,$$
$$65^8=1232^2=1517824\equiv 1547,\qquad 65^{16}=1547^2=2393209\equiv 789.$$

Hence

$$c=65^{17}\equiv 789\times 65=51285\equiv 51285-15\times 3233=2790.$$

The ciphertext is $2790$. Applying the same square-and-multiply to $2790$ with $d=2753$ recovers $65$.

(4) Because knowing $\varphi(n)$ is equivalent to knowing $(p-1)(q-1)=pq-p-q+1$, which together with $pq=n$ gives $p+q=n-\varphi(n)+1$, and then a quadratic equation yields $p,q$. So $\varphi(n)$ is a secret of the same level as $p,q$ and must never appear in the public key.

Comment: the point of this problem is not how fast the arithmetic is but the understanding that "the existence of $d$ comes from $e$ and $\varphi$ being coprime". Replace $e$ with $3$ and $\gcd(3,3120)=3$, so step (2) immediately has no solution.

### Example 3 (challenge: two classic attacks on textbook RSA)

Problem: (1) Let $n=3233$, $e=3$, plaintext $m=10$; encrypt directly and explain how an attacker recovers $m$ without the private key. (2) Let $n=77$, $d=37$, and suppose the signature of $m_1=2$ is $s_1=51$ and that of $m_2=3$ is $s_2=31$; find the forged signature of $m_1m_2=6$ and verify it.

Analysis: (1) Check whether $m^e$ is smaller than $n$; (2) exploit the multiplicativity of signatures $s_1s_2=(m_1m_2)^d$.

Solution: (1) $c=10^3=1000$. Since $1000<3233$, the modular reduction never "wrapped", so $c$ is simply the ordinary integer $m^3$. The attacker takes the cube root of $1000$ directly:

$$\sqrt[3]{1000}=10,$$

with no factorisation of $n$ and no private key. If $m$ were slightly larger, say $m=100$, then $m^3=10^6>3233$, the modular reduction takes effect and root extraction is no longer directly possible; but whenever $m^e<n$ the attack works.

(2) By multiplicativity,

$$s_1s_2\equiv 51\times 31=1581\equiv 1581-20\times 77=41\pmod{77}.$$

So $41$ is a valid signature on $6$. Verification: compute $41^3\bmod 77$.

$$41^2=1681\equiv 1681-21\times 77=64,\qquad 41^3\equiv 64\times 41=2624\equiv 2624-34\times 77=6.$$

Verified. The attacker used only two known message–signature pairs to forge a third without knowing $d$ at all.

Comment: both attacks stem from "no randomness and no structural disruption". OAEP padding turns $m$ into a large integer carrying a random seed, so $m^e$ almost certainly exceeds $n$ and small-exponent root extraction fails; the padding also makes $m_1m_2$ no longer the product of two valid padding strings, so multiplicative forgery fails as well. In engineering one must also follow "hash then sign" and report decryption failures uniformly, to prevent Bleichenbacher padding oracle attacks.

## 6. Common Errors and Pitfalls

- Error: treating $n$ as a secret. Correction: both $n$ and $e$ are the public key and may be published; what must stay secret is $d$ together with $p,q$.
- Error: not checking $\gcd(e,\varphi(n))=1$ when choosing $e$. Correction: if they are not coprime, $d$ does not exist and decryption must fail; key generation must verify and reselect.
- Error: choosing $p$ and $q$ too close together. Correction: if $p\approx q$ then $\sqrt{n}\approx p$ and Fermat factorisation succeeds quickly; the two primes should be chosen independently at random with a difference that is not too small.
- Error: using small or fixed primes "for testing". Correction: parameters such as $n=77$ break instantly; production requires random primes of 2048 bits or more.
- Error: encrypting short messages directly without padding. Correction: when $m^e<n$ the root can be taken directly, and deterministic encryption reveals whether plaintexts are equal. Use OAEP.
- Error: signing the message itself without hashing first. Correction: long messages cannot be exponentiated directly, and RSA's multiplicativity allows existential forgery; sign the hash and use PSS.
- Error: reusing the same random nonce for signatures or key exchange. Correction: the nonce must be fresh every time; reuse leaks the private key directly (see the ECDSA attack in the next topic).
- Error: thinking RSA can replace symmetric encryption for large files. Correction: RSA is orders of magnitude slower and is used only to encrypt session keys or to sign; bulk data goes to AES and similar symmetric algorithms.

## 7. Summary and Mnemonics

Key points reviewed:

- RSA's security rests on the difficulty of integer factorisation; $n=pq$ is public, $p,q$ are secret;
- $\varphi(n)=(p-1)(q-1)$; $e$ must be coprime to $\varphi(n)$ and $d$ is the modular inverse of $e$;
- Correctness is guaranteed by Euler's theorem $m^{\varphi(n)}\equiv 1$, with $ed=1+k\varphi(n)$;
- Textbook RSA is deterministic, multiplicative and open to root extraction for small messages; it needs OAEP/PSS;
- Signatures must hash first, destroying multiplicativity and compressing the length;
- Real systems use RSA to exchange keys or sign, and AES to encrypt data.

Mnemonic: **"Easy to multiply, hard to factor—that is the root; coprime is what gives the inverse; hash first and add salt, never let a small exponent run naked."**`,
    keyPoints: [
      'RSA security rests on the difficulty of integer factorisation; n=pq is public while p,q stay secret',
      'φ(n)=(p-1)(q-1), and e must be coprime to φ(n)',
      'Correctness is guaranteed by Euler\u2019s theorem: ed≡1 mod φ(n)',
      'Textbook RSA is deterministic and multiplicative, so OAEP/PSS padding is mandatory',
      'Signatures should be hashed before signing, which destroys multiplicative forgery',
    ],
  },
  'ecc': {
    chapter: 'Chapter 5 Elliptic Curve Cryptography',
    title: 'Elliptic Curves and ECC',
    summary:
      'Draw a group operation on a cubic curve: the intersections of chords and tangents underpin the public-key algorithm most used in phones and TLS.',
    content: String.raw`

RSA is reliable, but its keys keep growing fatter. To reach 128 bits of security, RSA needs a modulus of about 3072 bits, whereas elliptic curve cryptography of the same strength needs only a 256-bit private key. Ten times shorter means faster computation, less storage and lower power—decisive advantages for phones, smart cards and IoT devices. Open any HTTPS site today and the handshake most likely uses elliptic curves.

An elliptic curve is not an ellipse but a cubic curve of the form $y^2=x^3+ax+b$. It can be used in cryptography because points on the curve can be "added": draw a line through two points, it meets the curve at a third point, and reflecting that third point across the $x$ axis gives the "sum". This strange addition is associative, has an identity and has inverses, so it forms a group.

The cryptographic security comes from "easy forwards, hard backwards": given a point $P$, computing $kP=P+P+\cdots+P$ takes only a few hundred steps with the double-and-add algorithm; but given $P$ and $Q=kP$, the best known algorithm to recover $k$ needs about $\sqrt{n}$ steps, where $n$ is the order of the point. This is the elliptic curve discrete logarithm problem (ECDLP).

Opening question: why can a seemingly simple curve form a group? Why is the discriminant condition $4a^3+27b^2\neq 0$ required? If the curve has a cusp or a self-intersection, where does the group law break down?

## 2. Rigorous Definitions

**Definition (elliptic curve)**. Let $p>3$ be prime and $a,b\in\mathbb{F}_p$ satisfy

$$4a^3+27b^2\not\equiv 0\pmod p.$$

Then the equation

$$E:\ y^2=x^3+ax+b$$

together with the point at infinity $\mathcal{O}$ is called an elliptic curve over $\mathbb{F}_p$. The set of points on the curve is

$$E(\mathbb{F}_p)=\{(x,y)\in\mathbb{F}_p^2:\ y^2=x^3+ax+b\}\cup\{\mathcal{O}\}.$$

The condition $4a^3+27b^2\neq 0$ is called the non-singularity condition; it guarantees that the curve has a well-defined tangent everywhere, with no cusps or self-intersections.

**Definition (group law)**. For $P=(x_1,y_1)$ and $Q=(x_2,y_2)$:

- identity: $P+\mathcal{O}=\mathcal{O}+P=P$;
- inverse: $-P=(x_1,-y_1)$, and $P+(-P)=\mathcal{O}$;
- if $x_1\neq x_2$, let

$$\lambda=\frac{y_2-y_1}{x_2-x_1},\qquad x_3=\lambda^2-x_1-x_2,\qquad y_3=\lambda(x_1-x_3)-y_1,$$

then $P+Q=(x_3,y_3)$;
- if $P=Q$ and $y_1\neq 0$, let

$$\lambda=\frac{3x_1^2+a}{2y_1},$$

and use the same $x_3,y_3$ formulas to obtain $2P$;
- if $P=Q$ and $y_1=0$, then $2P=\mathcal{O}$ (that point has order two).

All divisions take place in $\mathbb{F}_p$, i.e. by multiplying by the inverse of the denominator modulo $p$.

**Definition (order of a point and order of the group)**. The order of a point $P$ is the smallest positive integer $r$ with $rP=\mathcal{O}$. The number of elements of the curve group $E(\mathbb{F}_p)$ is written $\#E(\mathbb{F}_p)$, and Hasse's theorem gives

$$\lvert \#E(\mathbb{F}_p)-(p+1)\rvert\le 2\sqrt{p}.$$

**Definition (ECDLP)**. Given $P\in E(\mathbb{F}_p)$ and $Q=kP$, find the integer $k$. This is precisely the security basis of elliptic curve cryptography.

**Definition (ECDH key exchange)**. Both parties agree on a curve and a base point $P$ (of large prime order $n$). Alice picks a private key $a$ and sends $A=aP$; Bob picks $b$ and sends $B=bP$. Both compute

$$S=aB=abP=bA.$$

The eavesdropper knows only $P,A,B$, and to obtain $S$ must solve the ECDLP (or the computational Diffie–Hellman problem).

**Definition (ECDSA signature)**. Let the base point $G$ have prime order $n$, with private key $d$ and public key $Q=dG$. To sign the message hash $z$:

1. Pick $k\in[1,n-1]$ at random;
2. Compute $R=kG$ and set $r=R_x\bmod n$; if $r=0$, pick another $k$;
3. Compute $s=k^{-1}(z+rd)\bmod n$; if $s=0$, pick another $k$;
4. The signature is $(r,s)$.

Verification computes $u_1=zs^{-1}$ and $u_2=rs^{-1}$ and checks that $(u_1G+u_2Q)_x\bmod n=r$.

## 3. Why Define It This Way

**Why require $4a^3+27b^2\neq 0$?** This quantity is the discriminant of the curve (up to the constant factor $-16$). When it vanishes the curve has a singularity and the denominators in the group law become zero. Take $y^2=x^3$, where $a=b=0$ and the discriminant is $0$. At the point $(0,0)$ the two tangents coincide, forming a cusp. Trying to compute $2(0,0)$, the formula gives

$$\lambda=\frac{3\cdot 0^2+0}{2\cdot 0}=\frac{0}{0},$$

completely undefined. More fundamentally, at a singular point the curve is neither smooth nor free of self-intersection, so one cannot draw a line that "meets the curve in exactly three points", and the group law loses its geometric basis.

**Why is the group law built from "chords and tangents"?** Because a cubic curve and a line generally have three intersections (counting multiplicity). Let $P,Q$ lie on the curve; the line $PQ$ meets the curve at a third point $R'$, and we define $P+Q=-R'$ (the reflection across the $x$ axis). The reflection step is what makes $P+(-P)=\mathcal{O}$: the line through $P$ and $-P$ is vertical, and its "third intersection" lies at infinity, so $\mathcal{O}$ is defined as the point at infinity and serves as the identity. Associativity is not obvious but can be proved algebraically or via the Riemann–Roch theorem.

**Why use the tangent when $P=Q$?** Because when the two points coincide, the secant degenerates into the tangent. The tangent is the limit of a secant as two points approach each other, so the denominators $y_2-y_1$ and $x_2-x_1$ both tend to zero, and the limit is the derivative

$$\lambda=\frac{dy}{dx}=\frac{3x^2+a}{2y}.$$

This also explains why doubling is impossible when $y_1=0$: the tangent is vertical, the third intersection is at infinity, and $2P=\mathcal{O}$.

**Why must $p$ be greater than 3?** For $p=2$ or $3$, the constants $4$ or $27$ vanish in the field and the short Weierstrass form above cannot represent all curves; more complicated equations are needed. For uniformity of formulas, standard curves take $p>3$.

**Why is the security strength $\sqrt{n}$ rather than $n$?** Because a generic attack exists: write $k=k_1+k_2m$ and use baby-step giant-step to find $k$ in about $2\sqrt{n}$ steps; the faster Pollard rho algorithm needs about $\sqrt{\pi n/2}$ steps. This has the same origin as the birthday bound for hashes—both look for a "match" among $n$ possible values. So a 256-bit curve provides about 128 bits of security, exactly matching AES-128.

**Why do practical curves use special parameters?** Not every curve is secure. If $\#E(\mathbb{F}_p)=p$ (a supersingular curve), the MOV attack reduces the ECDLP to a discrete logarithm in a finite field, greatly reducing security; if the order has small factors, small-subgroup attacks leak the private key modulo those factors step by step. Standard curves (such as Curve25519 and secp256r1) are therefore carefully chosen: the order is a large prime (or a large prime times a small cofactor) and they resist the various special attacks.

## 4. Intuition and Pictures

Picture the elliptic curve over the reals as a left–right symmetric "closed loop" plus a "tail" extending to infinity at both ends. Take any two points on the curve and join them; the line always crosses the curve a third time; reflect that third point to the other side of the $x$ axis and the addition is done. The beauty of the operation is that it uses only one geometric fact: a line meets a cubic in three points.

| Case | Geometric picture | Algebraic formula |
|---|---|---|
| $P\neq Q$, $x_1\neq x_2$ | the secant meets a third point; reflect | $\lambda=(y_2-y_1)/(x_2-x_1)$ |
| $P=Q$, $y_1\neq 0$ | the tangent meets a third point; reflect | $\lambda=(3x_1^2+a)/(2y_1)$ |
| $P=-Q$ | vertical line, third point at infinity | sum is $\mathcal{O}$ |
| $P=Q$, $y_1=0$ | vertical tangent, $P$ has order two | $2P=\mathcal{O}$ |

> Intuition: over the reals the curve is symmetric about the $x$ axis, so "reflecting" just changes $y$ into $-y$. This step guarantees that addition has inverses: the inverse of $P$ is its mirror image $-P$.

> Over a finite field the curve is no longer a continuous line but a scatter of points in a $p\times p$ grid, looking like sesame seeds thrown at random. Yet the algebraic formulas are unchanged and the group structure still holds. Cryptography uses exactly this "discrete yet regular" structure.

## 5. Worked Examples

### Example 1 (basic: doubling and double-and-add over a finite field)

Problem: Take $E:y^2=x^3+2x+2$ over $\mathbb{F}_{17}$ with $P=(5,1)$. (1) Verify that $P$ lies on the curve; (2) find $2P$; (3) find $4P$ and $8P$.

Analysis: All operations are modulo 17, with division replaced by multiplication by the inverse. Doubling uses $\lambda=(3x^2+a)/(2y)$.

Solution: (1) Right side $=5^3+2\times 5+2=125+10+2=137$, and $137-8\times 17=1$; left side $=1^2=1$. They are equal, so $P$ is on the curve.

(2) Here $a=2$ and $y=1$:

$$\lambda=\frac{3\times 25+2}{2\times 1}=\frac{77}{2}\equiv\frac{9}{2}\pmod{17}.$$

The inverse of $2$ is $9$ ($2\times 9=18\equiv 1$), so $\lambda\equiv 9\times 9=81\equiv 13$. Then

$$x_3=13^2-2\times 5=169-10=159\equiv 6\pmod{17},$$
$$y_3=13(5-6)-1=-13-1=-14\equiv 3\pmod{17}.$$

So $2P=(6,3)$. Check: $6^3+2\times 6+2=216+12+2=230$, and $230-13\times 17=9=3^2$.

(3) Compute $4P=2(2P)$ with $x=6$, $y=3$:

$$\lambda=\frac{3\times 36+2}{2\times 3}=\frac{110}{6}\equiv\frac{8}{6}\pmod{17}.$$

The inverse of $6$ is $3$, so $\lambda\equiv 8\times 3=24\equiv 7$. Then

$$x_3=49-12=37\equiv 3,\qquad y_3=7(6-3)-3=21-3=18\equiv 1.$$

So $4P=(3,1)$.

Now $8P=2(4P)$ with $x=3$, $y=1$:

$$\lambda=\frac{3\times 9+2}{2}=\frac{29}{2}\equiv\frac{12}{2}=12\times 9=108\equiv 6.$$

$$x_3=36-6=30\equiv 13,\qquad y_3=6(3-13)-1=-60-1=-61\equiv 7.$$

So $8P=(13,7)$.

Comment: every step is modulo 17, and division must be replaced by multiplication by the inverse. One can verify that this curve has 19 points including $\mathcal{O}$; 19 is prime, so every non-zero point has order 19 and $19P=\mathcal{O}$.

### Example 2 (advanced: a complete ECDH shared-key computation)

Problem: Still with $E:y^2=x^3+2x+2$ over $\mathbb{F}_{17}$ and $P=(5,1)$. Alice takes $a=3$ and Bob takes $b=5$. Find the public keys $A=3P$, $B=5P$ and the shared key $S=15P$.

Analysis: Use the doubling results of the previous problem, $2P=(6,3)$ and $4P=(3,1)$, plus the point addition formula.

Solution: First $A=3P=2P+P=(6,3)+(5,1)$. Since $x_1\neq x_2$,

$$\lambda=\frac{1-3}{5-6}=\frac{-2}{-1}=2.$$

$$x_3=4-6-5=-7\equiv 10,\qquad y_3=2(6-10)-3=-8-3=-11\equiv 6.$$

So $A=(10,6)$.

Next $B=5P=4P+P=(3,1)+(5,1)$:

$$\lambda=\frac{1-1}{5-3}=0,$$
$$x_3=0-3-5=-8\equiv 9,\qquad y_3=0\cdot(3-9)-1=-1\equiv 16.$$

So $B=(9,16)$.

Alice uses her private key $a=3$ to compute $3B=15P$. First $2B$ with $x=9$, $y=16$:

$$\lambda=\frac{3\times 81+2}{2\times 16}=\frac{245}{32}\equiv\frac{7}{15}\pmod{17}.$$

The inverse of $15$ is $8$ ($15\times 8=120\equiv 1$), so $\lambda\equiv 7\times 8=56\equiv 5$. Then

$$x_3=25-18=7,\qquad y_3=5(9-7)-16=10-16=-6\equiv 11.$$

With $2B=(7,11)$, add $B$:

$$\lambda=\frac{16-11}{9-7}=\frac{5}{2}\equiv 5\times 9=45\equiv 11,$$
$$x_3=121-16=105\equiv 3,\qquad y_3=11(7-3)-11=44-11=33\equiv 16.$$

So $S=3B=(3,16)$.

Bob uses his private key $b=5$ to compute $5A$ and should obtain the same point. Doubling gives $4A=(0,11)$, then adding $A=(10,6)$:

$$\lambda=\frac{6-11}{10-0}=\frac{-5}{10}\equiv\frac{12}{10}=12\times 12=144\equiv 8,$$
$$x_3=64-10=54\equiv 3,\qquad y_3=8(0-3)-11=-35\equiv 16.$$

Indeed $(3,16)$. Both parties obtain the same shared key.

Comment: what travels on the public channel is $A=(10,6)$ and $B=(9,16)$; to compute $15P$ the eavesdropper would have to invert $A=3P$ to get $3$, which is the ECDLP. This curve has only 19 points, so 19 trials break it; the real Curve25519 has about $2^{255}$ points.

### Example 3 (challenge: why a singular curve cannot be used for cryptography)

Problem: Consider $E:y^2=x^3$ over $\mathbb{F}_5$. (1) Compute the discriminant and decide whether the curve is singular; (2) find the singular point; (3) explain how the group law fails there; (4) list all points on the curve.

Analysis: The discriminant is $4a^3+27b^2$, with $a=b=0$ here. At a singular point both partial derivatives vanish.

Solution: (1) $4\times 0^3+27\times 0^2=0$, so the discriminant vanishes and the curve is singular.

(2) Let $F(x,y)=y^2-x^3$. The partial derivatives are

$$\frac{\partial F}{\partial y}=2y,\qquad \frac{\partial F}{\partial x}=-3x^2.$$

Setting both to zero: $2y\equiv 0$ gives $y=0$, and $-3x^2\equiv 0$ gives $x=0$ (since $3$ is invertible in $\mathbb{F}_5$). So the singular point is $(0,0)$, and it satisfies the curve equation $0^2=0^3$.

(3) Try to compute $2(0,0)$. The doubling formula requires

$$\lambda=\frac{3x^2+a}{2y}=\frac{0}{0},$$

so the denominator vanishes and the formula fails. Geometrically $(0,0)$ is a cusp where the curve has only one branch, and no line through that point can give "three distinct intersections", so the group law is undefined. Removing the singular point by force still does not leave a group.

(4) Enumerate $x=0,1,2,3,4$:

- $x=0$: $y^2=0$, $y=0$, giving $(0,0)$;
- $x=1$: $y^2=1$, $y=1,4$, giving $(1,1),(1,4)$;
- $x=2$: $y^2=8\equiv 3$, but the quadratic residues of $\mathbb{F}_5$ are $0,1,4$, and $3$ is not one, so no points;
- $x=3$: $y^2=27\equiv 2$, not a quadratic residue, so no points;
- $x=4$: $y^2=64\equiv 4$, $y=2,3$, giving $(4,2),(4,3)$.

Including the point at infinity, there are $1+2+2+1=6$ points. Of these $(0,0)$ is singular and only 4 are genuinely "smooth", which cannot form a group of prime order.

Comment: this shows that the non-singularity condition is not a technical nicety but the lifeline of the whole group structure. When choosing a curve one must verify $4a^3+27b^2\not\equiv 0$ and exclude small factors and special curves by testing the order.

## 6. Common Errors and Pitfalls

- Error: reading "elliptic" as elliptic geometry. Correction: the name comes from the inverse function of an elliptic integral; the curve itself is a cubic, unrelated to ellipses.
- Error: forgetting to verify the discriminant $4a^3+27b^2\neq 0$. Correction: with a zero discriminant the curve is singular and the group law fails; it must never be used for cryptography.
- Error: doing ordinary integer division when computing the slope. Correction: there is no real division in a finite field; multiply by the inverse of the denominator modulo $p$, and handle a zero denominator as the point at infinity.
- Error: computing the $y$ coordinate of $P+Q$ as $\lambda(x_1-x_3)+y_1$. Correction: the standard formula is $y_3=\lambda(x_1-x_3)-y_1$; one wrong sign gives a completely wrong result.
- Error: assuming any curve and any base point are secure. Correction: choose a base point of large prime order and exclude weak curves such as supersingular ones and anomalous ones ($\#E=p$).
- Error: running ECDH without authentication. Correction: bare ECDH cannot resist a man-in-the-middle attack, since the attacker can establish keys with each side separately; certificates or signatures are essential.
- Error: reusing or predicting the ECDSA nonce $k$. Correction: reusing $k$ reveals the private key directly, a major vulnerability that has really happened (see the next topic).
- Error: using short keys for performance. Correction: a 256-bit curve is roughly equivalent to 3072-bit RSA; anything shorter fails to reach 128-bit security.

## 7. Summary and Mnemonics

Key points reviewed:

- The elliptic curve $y^2=x^3+ax+b$ forms an Abelian group under the non-singularity condition $4a^3+27b^2\neq 0$;
- The group law comes from "a line meets the cubic in three points, then reflect", with the point at infinity as identity;
- The denominators in point addition and doubling must be inverted modulo $p$; a zero denominator corresponds to the point at infinity;
- Hasse's theorem bounds the group order, and a secure curve requires the base point to have large prime order;
- A generic attack on the ECDLP costs about $\sqrt{n}$, so a 256-bit curve gives about 128 bits of security;
- ECDH exchanges a shared point and ECDSA signs with $(r,s)$; both rely on the ECDLP.

Mnemonic: **"A chord meets three points, then flip them over; be careful when doubling at a tangent; let the discriminant vanish and the group is destroyed; short keys can still hold a thousand catties."**`,
    keyPoints: [
      'The elliptic curve group law comes from the chord-and-tangent construction, with the point at infinity as identity',
      'The non-singularity condition 4a³+27b²≠0 is the prerequisite for the group structure',
      'Division over a finite field must multiply by the modular inverse; a zero denominator corresponds to the point at infinity',
      'A generic attack on the ECDLP costs about √n, so a 256-bit curve gives about 128-bit security',
      'The base point order must be a large prime, and supersingular and anomalous curves must be excluded',
    ],
  },
  'signatures': {
    chapter: 'Chapter 6 Signatures and Protocols',
    title: 'Digital Signatures and Key Exchange',
    summary:
      'A signature proves "you signed it", and key exchange lets strangers agree on a shared secret—together they hold up the skeleton of secure communication.',
    content: String.raw`

The trustworthiness of a handwritten signature comes from the difficulty of forging the hand and of copying pen and paper. But a digital file can be copied bit for bit, so what entitles a string appended to the end of the file to prove "this is my signature"? Worse, a signature must be verifiable by anyone and forgeable by no one—two requirements that look contradictory.

Digital signatures resolve the contradiction with public-key cryptography: the private key is held only by you and used to produce the signature; the public key is open and anyone can verify. The signature is bound to the message, so changing one bit makes verification fail; it is non-transferable, so nobody without your private key can produce a new one. Legally, a reliable electronic signature has the same force as a handwritten one, precisely because of this mathematical guarantee.

Equally important is key exchange. Alice and Bob have never met, yet must agree in full view of everyone on a session key known only to them. The insight of Diffie and Hellman was: do not transmit the key itself; instead each computes a "half-finished product", exchange those publicly, then multiply in one's own secret, and both arrive at the same place by different routes. The eavesdropper sees both half-products but cannot compute the final result.

Opening question: why must a signature hash the message first? Why does a single repetition of the random number $k$ in ECDSA immediately leak the private key? And why does bare Diffie–Hellman not stop a man in the middle?

## 2. Rigorous Definitions

**Definition (digital signature scheme)**. A signature scheme consists of a triple $(\mathrm{Gen},\mathrm{Sign},\mathrm{Vrfy})$:

- $\mathrm{Gen}(1^\lambda)\to(pk,sk)$ generates the key pair;
- $\mathrm{Sign}(sk,m)\to\sigma$ produces a signature;
- $\mathrm{Vrfy}(pk,m,\sigma)\to\{0,1\}$ verifies, with the correctness requirement

$$\mathrm{Vrfy}(pk,m,\mathrm{Sign}(sk,m))=1,\qquad \text{for all } m.$$

**Definition (EUF-CMA security)**. Even if the attacker can query a signing oracle arbitrarily (a chosen-message attack), he cannot output a valid signature for a new message he never queried (existential unforgeability). This is the standard security goal of digital signatures.

**Definition (RSA signature)**. Private key $d$, public key $(n,e)$. For the message hash $z=H(m)$,

$$s=z^d\bmod n,\qquad \text{verify: } s^e\bmod n=z.$$

**Definition (ElGamal signature)**. Take a prime $p$ and a generator $g$, with private key $x$ and public key $y=g^x\bmod p$. The signature is

$$r=g^k\bmod p,\qquad s=(H(m)-xr)k^{-1}\bmod (p-1),$$

where $k$ is random and coprime to $p-1$. Verification:

$$g^{H(m)}\equiv y^r r^s\pmod p.$$

**Definition (ECDSA)**. Group order the prime $n$, base point $G$, private key $d$ and public key $Q=dG$. For the hash $z$:

$$r=(kG)_x\bmod n,\qquad s=k^{-1}(z+rd)\bmod n.$$

Verification computes $u_1=zs^{-1}\bmod n$ and $u_2=rs^{-1}\bmod n$ and checks

$$(u_1G+u_2Q)_x\bmod n=r.$$

**Definition (Diffie–Hellman key exchange)**. Public prime $p$ and primitive root $g$. Alice picks $a$ and sends $A=g^a$; Bob picks $b$ and sends $B=g^b$. Both compute

$$K=A^b=g^{ab}=B^a.$$

**Definition (man-in-the-middle attack)**. The attacker Mallory establishes two independent DH sessions, one with Alice and one with Bob: he negotiates $K_1$ with Alice using his own $m_1$, and $K_2$ with Bob using his own $m_2$, then forwards and re-encrypts. Both sides believe they are talking to each other, while in fact each shares a key with Mallory.

## 3. Why Define It This Way

**Why must a signature hash first?** Three reasons.

First, length. RSA can only exponentiate integers smaller than $n$, so a message of arbitrary length must be compressed first.

Second, destroying multiplicativity. Without hashing, $s_1s_2$ is a valid signature on $m_1m_2$ and the attacker can forge out of thin air. After hashing, $H(m_1)H(m_2)$ has no relation to $H(m_1m_2)$, and that path is closed.

Third, efficiency. Hashing a 1 GB file once and then exponentiating a 256-bit digest is incomparably faster than exponentiating the whole file.

**Why must the ECDSA $k$ be fresh and secret every time?** Because in $s=k^{-1}(z+rd)$, $k$ is the only quantity masking the private key. If two signatures use the same $k$, giving $(r,s_1)$ and $(r,s_2)$, subtracting the two equations gives

$$s_1-s_2=k^{-1}(z_1-z_2)\quad\Longrightarrow\quad k=\frac{z_1-z_2}{s_1-s_2}\bmod n.$$

Once $k$ is known the private key is exposed at once:

$$d=\frac{s_1k-z_1}{r}\bmod n.$$

In 2010 Sony's PS3 signing key leaked precisely because the firmware used a fixed $k$. The mistake recurs in practice and is cryptography's most famous case of "one line of code destroying an entire system".

**Why does the verification formula hold?** Taking ECDSA, the verifier computes

$$u_1G+u_2Q=\frac{z}{s}G+\frac{r}{s}dG=\frac{z+rd}{s}G.$$

But $s=k^{-1}(z+rd)$, so $s^{-1}=k(z+rd)^{-1}$; substituting,

$$\frac{z+rd}{s}G=kG,$$

whose $x$ coordinate modulo $n$ is exactly $r$. The whole verification uses only public information $Q,z,r,s$.

**Why must the ElGamal $k$ be coprime to $p-1$?** Because the formula for $s$ multiplies by $k^{-1}$; if $\gcd(k,p-1)>1$, then $k$ is not invertible modulo $p-1$ and no signature can be produced. This is the same reason RSA requires $e$ coprime to $\varphi(n)$.

**Why does bare DH not stop a man in the middle?** Because DH only guarantees "both sides computed the same key", not "who the other side is". Mallory intercepts $A=g^a$, replaces it with $g^{m_1}$ and sends it to Bob; intercepts $B=g^b$, replaces it with $g^{m_2}$ and sends it to Alice. Alice computes $g^{am_1}$, Bob computes $g^{bm_2}$, and Mallory knows both. He then decrypts, reads, re-encrypts with the other key and forwards, and neither side notices. The remedy is authentication: bind public keys to identities with certificates or digital signatures, or use authenticated key exchange (such as the signed handshake of TLS 1.3).

**Why must $g$ be a primitive root?** If the order of $g$ is only a small factor $r$ of $p-1$, then all public keys lie in a subgroup of order $r$ and the discrete logarithm needs only $O(\sqrt{r})$ steps. More dangerous is the small-subgroup attack: the attacker can send a low-order point, inducing the other side to compute a small amount of information about the shared key, and by repeating this can piece together the private key. Modern protocols therefore require safe primes and verify that received public keys really lie in the large prime-order subgroup.

## 4. Intuition and Pictures

Think of a signature as "a seal only you can stamp": the seal (private key) stays at home, the imprinted pattern (signature) can be checked by the whole world, but nobody can counterfeit it. Hashing is "compress the file into a fingerprint first, then stamp"—the seal goes only on the fingerprint, and if the file changes the fingerprint changes and the seal no longer matches.

| Scheme | Hard problem | Signature length | Randomness requirement | Typical use |
|---|---|---|---|---|
| RSA-PSS | integer factorisation | equal to the modulus | random salt | certificates, code signing |
| ElGamal | finite-field discrete log | about $2\log p$ | $k$ must be freshly random | teaching, legacy protocols |
| DSA | finite-field discrete log | about $2\log q$ | $k$ must be freshly random | FIPS standard |
| ECDSA | elliptic-curve discrete log | about $2\log n$ | $k$ must be freshly random | TLS, blockchains |
| Ed25519 | elliptic-curve discrete log | 64 bytes | deterministic $k$ | SSH, modern TLS |

> Intuition: signing = using the private key to perform "in reverse" an operation only you can do; verification = using the public key to perform "forwards" an operation anyone can do. Easy forwards, hard backwards—exactly the one-wayness of public-key cryptography.

> Intuition for key exchange: Alice pours paint A into one bucket of a public solvent, Bob pours paint B into another. After swapping buckets each adds their own paint, and both obtain the same mixed colour. The eavesdropper sees both intermediate buckets but cannot separate out the original paints—this is the "irreversible mixing" of the discrete logarithm.

## 5. Worked Examples

### Example 1 (basic: a complete small-parameter RSA signature computation)

Problem: Take $p=5$, $q=11$, $e=3$ and message hash $z=14$. (1) Find $n,\varphi(n),d$; (2) generate the signature $s$; (3) verify the signature.

Analysis: $n=55$, $\varphi=40$, and the inverse of $3$ modulo $40$ is $27$ ($3\times 27=81\equiv 1$). The signature is $s=z^d\bmod n$.

Solution: (1) $n=5\times 11=55$, $\varphi(n)=4\times 10=40$, $d=27$.

(2) Compute $14^{27}\bmod 55$. With $27=16+8+2+1$, square repeatedly:

$$14^2=196\equiv 196-3\times 55=31,$$
$$14^4=31^2=961\equiv 961-17\times 55=26,$$
$$14^8=26^2=676\equiv 676-12\times 55=16,$$
$$14^{16}=16^2=256\equiv 256-4\times 55=36.$$

Hence

$$s=14^{27}=14^{16}\cdot 14^8\cdot 14^2\cdot 14\equiv 36\times 16\times 31\times 14.$$

Step by step: $36\times 16=576\equiv 576-10\times 55=26$; $26\times 31=806\equiv 806-14\times 55=36$; $36\times 14=504\equiv 504-9\times 55=9$. So $s=9$.

(3) Verify $s^e=9^3=729$. Since $55\times 13=715$, $729-715=14=z$. Verified.

Comment: signing and encryption use opposite exponents: encryption uses the public $e$, signing the private $d$. This also warns us never to use the same key pair for both encryption and signing—the security models differ and mixing them invites cross-protocol attacks.

### Example 2 (advanced: the ECDSA nonce-reuse attack)

Problem: A curve has order $n=101$ and public key corresponding to private key $d$. Two signatures use the same random number $k=29$, giving $(r,s_1)=(41,61)$ and $(r,s_2)=(41,69)$ for hashes $z_1=50$ and $z_2=80$. (1) Recover $k$; (2) recover $d$; (3) explain why the identical $r$ exposes the problem.

Analysis: Subtracting the two equations eliminates $d$; solve for $k$ first, then substitute back into either equation for $d$.

Solution: (1) From $s=k^{-1}(z+rd)$ we get $s_1-s_2=k^{-1}(z_1-z_2)$, hence

$$k=\frac{z_1-z_2}{s_1-s_2}=\frac{50-80}{61-69}=\frac{-30}{-8}=\frac{30}{8}\pmod{101}.$$

The inverse of $8$ is $38$ ($8\times 38=304=3\times 101+1$), so

$$k\equiv 30\times 38=1140\equiv 1140-11\times 101=29.$$

matching the given value.

(2) From $s_1=k^{-1}(z_1+rd)$ we get $d=(s_1k-z_1)r^{-1}$. First

$$s_1k-z_1=61\times 29-50=1769-50=1719\equiv 1719-17\times 101=2.$$

Now find the inverse of $41$ by Euclid:

$$101=2\times 41+19,\quad 41=2\times 19+3,\quad 19=6\times 3+1.$$

Back-substituting:

$$1=19-6\times 3=19-6(41-2\times 19)=13\times 19-6\times 41$$
$$=13(101-2\times 41)-6\times 41=13\times 101-32\times 41.$$

So $41^{-1}\equiv -32\equiv 69\pmod{101}$. Hence

$$d\equiv 2\times 69=138\equiv 37\pmod{101}.$$

(3) In ECDSA $r$ is determined solely by $kG$. Two signatures with the same $r$ mean the same $k$ was used (or $k$ and $-k$, which also give the same $x$ coordinate), a publicly visible "fingerprint". The attacker needs no secret information: seeing two signatures with the same $r$ in a blockchain or a log is enough to compute the private key by the steps above.

Comment: there are two defences: generate $k$ with a cryptographically secure random number generator, never from a timestamp, counter or fixed value; or use deterministic signatures (RFC 6979), deriving $k$ jointly from the private key and the message hash, which avoids both poor randomness and reuse without leaking the private key.

### Example 3 (challenge: a Diffie–Hellman computation and the small-subgroup trap)

Problem: Take $p=23$, $g=5$, with Alice's private key $a=6$ and Bob's $b=15$. (1) Find the public keys $A,B$ and the shared key $K$; (2) if $g=2$ were chosen by mistake, find the order of $g$ and explain the danger.

Analysis: All operations are modulo 23. Part (2) requires the order of $2$ in $\mathbb{F}_{23}^*$, which has order 22.

Solution: (1) Compute $A=5^6$. Squaring first:

$$5^2=25\equiv 2,\qquad 5^4\equiv 2^2=4,$$
$$A=5^6=5^4\cdot 5^2\equiv 4\times 2=8.$$

Compute $B=5^{15}$ with $15=8+4+2+1$:

$$5^8=4^2=16,$$
$$B\equiv 16\times 4\times 2\times 5=640\equiv 640-27\times 23=19.$$

The shared key is

$$K=B^a=19^6.$$

First $19^2=361\equiv 361-15\times 23=16$ and $19^4\equiv 16^2=256\equiv 256-11\times 23=3$, so

$$K=19^6=19^4\cdot 19^2\equiv 3\times 16=48\equiv 2.$$

Check by the other route: $A^b=8^{15}$. With $8^2=64\equiv 18$, $8^4\equiv 18^2=324\equiv 2$ and $8^8\equiv 4$,

$$8^{15}=8^8\cdot 8^4\cdot 8^2\cdot 8\equiv 4\times 2\times 18\times 8=1152\equiv 1152-50\times 23=2.$$

Both sides give $2$.

(2) With $g=2$, compute the powers: $2^2=4$, $2^4=16$, $2^8=256\equiv 3$, $2^{11}=2^8\cdot 2^2\cdot 2\equiv 3\times 4\times 2=24\equiv 1$. Checking the smaller factors $1,2$: $2^1=2\neq 1$ and $2^2=4\neq 1$. So the order of $2$ is $11$, generating only half the elements of $\mathbb{F}_{23}^*$.

The danger is that all public keys lie in a subgroup of order 11, so the discrete logarithm needs only a search over 11 elements; worse, the attacker can send an element of order 2 (such as $-1=22$), inducing the other party to compute a shared key of $\pm 1$ and thereby leaking information about the private key modulo 2. By repeating with different small factors and the Chinese remainder theorem the whole private key can be reconstructed. The defence is to choose a safe prime $p=2q+1$ ($q$ a large prime), take a generator of the order-$q$ subgroup, and verify that received public keys $y$ satisfy $y^q=1$ with $y\neq 1$.

Comment: DH's security depends not only on "$p$ being large enough" but on "the subgroup generated by $g$ being large and free of small factors". Choose the parameters wrongly and no key length can save you.

## 6. Common Errors and Pitfalls

- Error: signing the message directly without hashing. Correction: RSA's multiplicativity allows existential forgery, and long messages cannot be exponentiated directly; hash before signing.
- Error: a reused, predictable or weakly random $k$ in ECDSA/DSA. Correction: reusing $k$ reveals the private key within a few steps; use a CSPRNG or the deterministic derivation of RFC 6979.
- Error: using a signature as encryption, or an encryption key as a signing key. Correction: the security goals differ and keys must be separated, otherwise cross-protocol attacks arise.
- Error: not checking the ranges of $r,s$ during verification. Correction: verify $1\le r,s<n$, otherwise signature malleability attacks (several valid signatures for the same message) become possible.
- Error: using bare DH directly for communication. Correction: public keys must be authenticated, or a man in the middle can negotiate keys with each side separately; use certificates, signatures or an authenticated TLS handshake.
- Error: using a non-primitive root or an unverified subgroup. Correction: choose safe primes and large prime-order subgroups, and verify that public keys lie in the correct subgroup to prevent small-subgroup attacks.
- Error: thinking a signature guarantees confidentiality. Correction: a signature guarantees only integrity and authentication, not secrecy; for confidentiality encrypt first or use AEAD.
- Error: leaking detailed reasons when signature verification fails. Correction: return a uniform "verification failed" to avoid giving the attacker side-channel information.

## 7. Summary and Mnemonics

Key points reviewed:

- A digital signature satisfies correctness, with EUF-CMA as its goal: existentially unforgeable under chosen-message attacks;
- RSA signatures use the private exponent; ECDSA uses $(r,s)$ with a random $k$; verification uses only public information;
- Always hash before signing, to compress the length and destroy multiplicativity;
- The ECDSA $k$ must be fresh and secret every time; one reuse leaks the private key;
- DH/ECDH let two parties agree on a shared key over a public channel, but identity must be authenticated to prevent man-in-the-middle attacks;
- Parameters must use safe primes and large prime-order subgroups to prevent small-subgroup and discrete-log attacks.

Mnemonic: **"Hash first, sign after; k only once, keys never mixed; DH needs authentication, subgroups must be large."**`,
    keyPoints: [
      'The standard goal of a digital signature is EUF-CMA existential unforgeability',
      'Always hash before signing, to compress the length and destroy multiplicative forgery',
      'Reusing the ECDSA random number k leaks the private key directly',
      'Bare Diffie–Hellman cannot resist man-in-the-middle attacks and must be authenticated',
      'Parameters must use safe primes and large prime-order subgroups to prevent small-subgroup attacks',
    ],
  },
};

export default map;
