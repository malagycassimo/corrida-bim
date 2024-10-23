import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { IconPack } from "@/components/common/IconPack";
import { Dispatch, SetStateAction } from "react";
import { FormState } from ".";

const formSchema = z.object({
  category: z.enum(["caminhada", "juvenis", "populares", "veteranos-35-45-f-40-50-h", "veteranos-maior-45-f-maior-50-h", "federados", "estrangeiros-menor-50-h-menor-45-f", "estrangeiros-maior-50-h-maior-45-f", "deficientes-de-triciclos", "deficientes-de-cadeiras", "pessoal-bim-menor-40", "pessoal-bim-maior-40", "pessoal-bim-reformado"]
    , {
    message: "Selecione uma categoria válida.",
  }),
  route: z.string(),
  shirt: z.string(),
});

export default function Step2({
  state,
  setState,
}: {
  state: FormState;
  setState: Dispatch<SetStateAction<FormState>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: state.step2 as unknown as z.infer<typeof formSchema>,
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    setState((state) => {
      return { ...state, step2: values, currentStep: 2 };
    });
    setTimeout(() => {
      console.log(values);
    }, 2000);
  }

  function onPrevious() {
    setState((state) => {
      return { ...state, currentStep: state.currentStep - 1 };
    });
  }

  return (
    <Form {...form}>
      <h1 className="text-center text-3xl font-semibold">Dados da corrida</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="caminhada">Caminhada</SelectItem>
                    <SelectItem value="caminhada">Caminhada</SelectItem>
                    <SelectItem value="juvenis">Juvenis</SelectItem>
                    <SelectItem value="populares">Populares</SelectItem>
                    <SelectItem value="veteranos-35-45-f-40-50-h">
                      Veteranos 35-45 (F) & 40-50 (M) anos (a)
                    </SelectItem>
                    <SelectItem value="veteranos-maior-45-f-maior-50-h">
                      Veteranos maior de 45 (F) & maior de 50 (M) anos (a)
                    </SelectItem>
                    <SelectItem value="federados">Federados</SelectItem>
                    <SelectItem value="estrangeiros-menor-50-h-menor-45-f">
                      Estrangeiros menor de 50 anos (M) / menor de 45 anos (F)
                      (c)
                    </SelectItem>
                    <SelectItem value="estrangeiros-maior-50-h-maior-45-f">
                      Estrangeiros maior de 50 anos (M) / maior de 45 anos (F)
                      (c)
                    </SelectItem>
                    <SelectItem value="deficientes-de-triciclos">
                      Deficientes de triciclos (b)
                    </SelectItem>
                    <SelectItem value="deficientes-de-cadeiras">
                      Deficientes de cadeiras (b)
                    </SelectItem>
                    <SelectItem value="pessoal-bim-menor-40">
                      Pessoal do BIM menor de 40 anos (c)
                    </SelectItem>
                    <SelectItem value="pessoal-bim-maior-40">
                      Pessoal do BIM maior de 40 anos (c)
                    </SelectItem>
                    <SelectItem value="pessoal-bim-reformado">
                      Pessoal do BIM reformado
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="route"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Percurso</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o seu percurso" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="caminhada">Caminhada - 7KM</SelectItem>
                    <SelectItem value="dificiente">
                      Portadores De Deficiência - 9k
                    </SelectItem>
                    <SelectItem value="pedestre">
                      Corrrida Pedestre - 15km
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shirt"
            render={({ field }) => (
              <FormItem className="w-fit">
                <FormLabel>Tamaho da camiseta</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o seu tamanho" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="small">S</SelectItem>
                    <SelectItem value="large">L</SelectItem>
                    <SelectItem value="extralarge">XL</SelectItem>
                    <SelectItem value="doubleextralarge">XXL</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={onPrevious}
            className="btn border-2 text-zinc-600 from-primary to-secondary flex"
          >
            <IconPack.ArrowRight className="rotate-180" stroke="#52525b" />{" "}
            <span>Anterior</span>
          </button>
          <button
            type="submit"
            className="ml-auto btn text-white bg-gradient-to-br from-primary to-secondary flex"
          >
            <span>Seguinte</span> <IconPack.ArrowRight />
          </button>
        </div>
      </form>
    </Form>
  );
}
