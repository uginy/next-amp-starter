export const validationMethods = {
  validator: {
    required: (value) => !!!value,
  },
  validation: {
    required: (label) => `${label} is required`,
  },
};
