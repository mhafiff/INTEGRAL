function calculateIntegral() {
    // Mendapatkan input dari pengguna
    const func = document.getElementById('function-input').value;
    const lowerBound = parseFloat(document.getElementById('lower-bound').value);
    const upperBound = parseFloat(document.getElementById('upper-bound').value);

    // Memastikan input valid
    if (!func || isNaN(lowerBound) || isNaN(upperBound)) {
        document.getElementById('result').innerText = 'Error: Masukkan fungsi dan batas atas/bawah yang valid!';
        return;
    }

    // Menggunakan math.js untuk mengevaluasi fungsi
    try {
        const expression = math.compile(func);
        
        // Definisikan fungsi yang akan diintegralkan
        const f = function(x) {
            return expression.evaluate({ x: x });
        };

        // Fungsi untuk menghitung integral dengan metode Trapezoidal
        const integrate = (f, a, b, n = 1000) => {
            let h = (b - a) / n;
            let sum = 0.5 * (f(a) + f(b));
            for (let i = 1; i < n; i++) {
                sum += f(a + i * h);
            }
            return sum * h;
        };

        // Hitung integral
        const result = integrate(f, lowerBound, upperBound);

        // Tampilkan hasil
        document.getElementById('result').innerText = `Hasil: ${result.toFixed(4)}`;
    } catch (error) {
        document.getElementById('result').innerText = 'Error: Masukkan fungsi yang valid!';
    }
}
