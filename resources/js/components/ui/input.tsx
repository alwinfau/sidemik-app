import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-11 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }


//
// import * as React from "react"
// import { cn } from "@/lib/utils"
// import {Eye, EyeOff} from "lucide-react";
//
// function Input({ className, type, ...props }: React.ComponentProps<"input">) {
//     const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
//
//     // Tentukan tipe input: 'text' jika password terlihat, jika tidak gunakan tipe default
//     const inputType = type === "password" && !isPasswordVisible ? "password" : "text"
//
//     return (
//         <div className="relative w-full">
//             <input
//                 type={inputType}
//                 data-slot="input"
//                 className={cn(
//                     "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-11 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//                     "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
//                     "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
//                     className
//                 )}
//                 {...props}
//             />
//             {type === "password" && (
//                 <button
//                     type="button"
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//                     onClick={() => setIsPasswordVisible((prev) => !prev)}
//                 >
//                     {isPasswordVisible ? <Eye /> : <EyeOff />}
//                 </button>
//             )}
//         </div>
//     )
// }
//
// export { Input }
