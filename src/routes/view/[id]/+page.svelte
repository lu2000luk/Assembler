<script>
    let { data } = $props();
    let { id } = data;
    import { SignedOut } from 'sveltefire';
</script>

<SignedOut>
    <div class="navbar flex justify-between m-4 items-center select-none">
        <div class="name">
            <a class="text-2xl hover:tracking-wide cursor-pointer font-bold inline-block bg-clip-text bg-gradient-to-r from-primary to-accent transition-all" style="color: transparent;" href="../../">
                Assembler
            </a>
        </div>
        <button onclick={() => {location.href = "/"}} class="px-5 py-2 border-2 rounded-lg border-accent transition-all duration-200 hover:bg-accent cursor-pointer">Create your own</button>
    </div>
</SignedOut>

<iframe src="../p/{id}?hideNavbar=true" frameborder="0" title="Assembler View" class="fullscreen-iframe"></iframe>

<style>
    .fullscreen-iframe {
        width: 100%;
        height: 100%;
        border: none;
    }
</style>