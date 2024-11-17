<script>
    let { args, id } = $props();
    let { placeholder = "Write here..." } = args;
</script>

<input class="input border-2 rounded-lg border-accent focus:border-secondary outline-none bg-background p-2" autocapitalize="off" autocomplete="off" type="text" placeholder={placeholder} id={id} />