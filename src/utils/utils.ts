export const handleOpenLink = (url: string) => {
  window.open(url, '_blank');
};

export const validEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    return false;
  }

  return true;
};
