import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const PForm = ({ children, onSubmit, defaultValues, resolver }) => {
  const FormConfig = {};
  const methods = useForm(FormConfig);

  if (defaultValues) {
    FormConfig['defaultValues'] = defaultValues;
  }

  if (resolver) {
    FormConfig['resolver'] = resolver;
  }

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default PForm;
