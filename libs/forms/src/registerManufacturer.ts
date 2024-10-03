import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const schemaRegisterManufacturer = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  contact: z.string().optional(),
});

export type FormTypeRegisterManufacturer = z.infer<
  typeof schemaRegisterManufacturer
>

const formData: FormTypeRegisterManufacturer = {
  name: '',
  location: '',
  contact: '',
}

export const useFormRegisterManufacturer = () => {
  return useForm({
    resolver: zodResolver(schemaRegisterManufacturer),
  })
}


