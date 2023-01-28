import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";
import { toast, ToastContainer } from "react-toastify";

const avaliableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) {
      toast.error('Preencha todos os dados');
      return;
    }

    await api.post("habits", {
      title,
      weekDays,
    });

    setTitle("");
    setWeekDays([]);

    toast.success('Hábito adicionado com sucesso!');
  }

  function handleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysRemoved = weekDays.filter((day) => day !== weekDay);
      setWeekDays(weekDaysRemoved);
    } else {
      setWeekDays([...weekDays, weekDay]);
    }
  }

  return (
    <>
    <ToastContainer position="top-left" autoClose={2500}/>
    <form className="w-full flex flex-col mt-6" onSubmit={createNewHabit}>
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        name="title"
        id="title"
        placeholder="ex: Execício, dormir bem, etc..."
        autoFocus
        value={title}
        onChange={(event) => setTitle(event?.target.value)}
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-800 focus:ring-offset-1 focus:ring-offset-zinc-900"
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {avaliableWeekDays.map((weekDay, i) => (
          <Checkbox.Root
            className="flex items-center gap-3 group focus:outline-none"
            key={weekDay}
            checked={weekDays.includes(i)}
            onCheckedChange={() => handleWeekDay(i)}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-400 transition-colors group-focus:ring-2 group-focus:ring-violet-800 group-focus:ring-offset-1 group-focus:ring-offset-zinc-900">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>
            <span className="text-white leading-tight">{weekDay}</span>
          </Checkbox.Root>
        ))}
      </div>
      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-1 focus:ring-offset-zinc-900"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
    </>
  );
}
