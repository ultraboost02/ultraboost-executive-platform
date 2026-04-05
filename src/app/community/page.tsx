import { redirect } from "next/navigation";

/** La communauté et les agendas dédiés sont accessibles depuis l’espace membre et la page Agenda. */
export default function CommunityPage() {
  redirect("/agenda");
}
