import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from 'react';

export const useDealogState = (defaultState = false) => {
  const [open, setOpen] = useState(defaultState);

  const path_name = usePathname();
  const initial_pathname = useRef(path_name);

  useEffect(() => {
    if (path_name !== initial_pathname.current) {
      setOpen(false);
      initial_pathname.current = path_name;
    }
  }, [path_name, open]);
  return [open, setOpen] as const;
}
