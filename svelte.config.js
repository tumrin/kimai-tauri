import staticAdapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svx', '.md'],
  preprocess: preprocess({
    postcss: true,
  }),
  kit: {
    adapter: staticAdapter(),
  },
}

export default config
