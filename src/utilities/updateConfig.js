const updateConfig = (config = {}, activityPin) => {
  const updatedConfig = {
    ...config,
    headers: {
      ...(config?.headers || {}), 
      activity_pin: activityPin,
    },
  };

  return updatedConfig;
};

export default updateConfig;
