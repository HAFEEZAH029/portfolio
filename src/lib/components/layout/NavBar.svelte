<script lang="ts">
  import { navLinks } from '$lib/data/navigation';
  
</script>

<header class="fixed left-0 top-0 z-50 w-full border-b border-cyan-400/10 bg-[#020b0c]/80 backdrop-blur-xl shadow-md shadow-cyan-200/25">
  <nav class="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
    <a href="#top" class="flex items-center gap-2 text-sm md:text-xl font-bold tracking-wide text-cyan-300">
      <span class="h-2 w-2 rounded-sm border border-cyan-300"></span>
      vSTUDIO_CORE
    </a>

    <div class="hidden items-center gap-8 lg:flex">
      {#each navLinks as link}
        <a
          href={link.href}
          class="text-[0.65rem] md:text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-slate-300 transition hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          {link.label}
        </a>
      {/each}
    </div>

    <button
      type="button"
      class="rounded-sm border border-cyan-300 bg-cyan-300 px-3 py-1 text-[0.65rem] md:text-[0.7rem] font-bold uppercase tracking-widest text-black transition hover:bg-violet-500/10 hover:border-cyan-300 hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 cursor-pointer"
    >
      Ctrl + K
    </button>
  </nav>
</header>