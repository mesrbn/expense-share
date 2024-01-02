export const useRedirectIfAuth = (url = "/") => {
  // video 87, 88
  const user = useSupabaseUser();
  watch(
    user,
    (user) => {
      if (user) {
        return navigateTo(url);
      }
    },
    { immediate: true }
  );

  return { user };
};
