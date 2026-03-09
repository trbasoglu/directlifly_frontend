// middleware/admin-only.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const client = useSupabaseClient()

  if (!user.value) {
    return navigateTo('/')
  }

  const { data } = await client
    .from('profiles')
    .select('role')
    .eq('id', user.value.id)
    .single()

  const profile = data as { role: string } | null


  const allowedRoles = ['admin', 'editor']

  if (!profile || !allowedRoles.includes(profile.role)) {
    return navigateTo('/')
  }
})