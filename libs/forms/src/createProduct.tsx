import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { ReactNode } from 'react';

export const schemaCreateProduct = z.object({
  name: z.string().min(1),
  toxicItems: z.array(
    z.object({ name: z.string().min(1), weight: z.number().min(1) }),
  )
});

export type FormTypeCreateProduct = z.infer<typeof schemaCreateProduct>;

export const useFormCreateProduct = () => {
  return useForm<FormTypeCreateProduct>({ resolver: zodResolver(schemaCreateProduct) });
}

type Props = {
  children: ReactNode,
}

export const FormProviderCreateProduct = ({ children }: Props) => {
  const methods = useFormCreateProduct();
  return (
    <FormProvider {...methods}>{children}</FormProvider>
  );
};

