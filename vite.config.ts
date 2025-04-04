import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [tailwindcss(),react()],
//   base: "/projectanime/"
  
// })

export default defineConfig(({ command }) => {
  const config = {
    plugins: [tailwindcss(),react()],
    base: '/',
  }

  if (command !== 'serve') {
    config.base = '/projectanime/'
  }

  return config
})