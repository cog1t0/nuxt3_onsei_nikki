// plugins/supabase.ts
import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const supabaseUrl = useRuntimeConfig().public.SUPABASE_URL as string
  const supabaseKey = useRuntimeConfig().public.SUPABASE_ANON_KEY as string

  const supabase = createClient(supabaseUrl, supabaseKey)

  return {
    provide: {
      supabase
    }
  }
})
