export const useAvatarUrl = () => {
  // Get the current user metadata - which contain name of avatar image
  // Public URL of that image
  // Watch user for any changes - so we always display image of the user

  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const getPublicUrl = () => {
    if (!user.value?.user_metadata?.avatar_url)
      return "https://profile.s3.nl-ams.scw.cloud/user.png";

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(user.value?.user_metadata?.avatar_url);

    return data.publicUrl;
  };

  const url = ref(getPublicUrl());

  watch(user, () => (url.value = getPublicUrl()), { immediate: true });
  console.log(url);

  return { url };
};
