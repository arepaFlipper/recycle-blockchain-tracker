import { z } from "zod";
import { ProductStatus } from "@recycle-chain/network/src/gql/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schemaBulkStatusUpdate = z.object({
  ids: z.string().min(1),
  status: z.nativeEnum(ProductStatus),
});

export type FormTypeBulkStatusUpdate = z.infer<typeof schemaBulkStatusUpdate>;

const useFormBulkStatusUpdate = () => {
  return useForm<FormTypeBulkStatusUpdate>({
    resolver: zodResolver(schemaBulkStatusUpdate),
  })
}

export { schemaBulkStatusUpdate };
