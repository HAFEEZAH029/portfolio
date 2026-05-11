<script lang="ts">
  import { navLinks } from '$lib/data/navigation';
</script>

<nav
  aria-label="Mobile section navigation"
  class="fixed bottom-4 left-1/2 z-50 flex w-[90%] max-w-sm -translate-x-1/2 items-center justify-around rounded-xl border border-cyan-400/20 bg-[#071011]/90 px-3 py-2 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl lg:hidden"
>
  {#each navLinks as link}
     {@const Icon = link.icon}
    <a
      href={link.href}
      class="flex min-w-20 flex-col items-center gap-1 rounded-lg px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-wider text-slate-400 transition hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
    >
      <span class="grid h-5 w-5 place-items-center rounded-md border border-cyan-400/20 text-cyan-300">
        <Icon size={15} strokeWidth={1.8} />
      </span>
      <span>{link.label}</span>
    </a>
  {/each}
</nav>