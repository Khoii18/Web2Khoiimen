/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'move-bg': 'moveBg 10s linear infinite', // Tạo hiệu ứng di chuyển background
      },
      keyframes: {
        moveBg: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundSize: {
        '200%': '200% 200%', // Cho phép background di chuyển xa hơn
      },
    },
  },
  plugins: [],
}