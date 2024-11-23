<script>
// @ts-nocheck

    let { args, id } = $props();
    let { placeholder = "Write here...", rows = 4, cols = 50  } = args;
</script>

<textarea class="component textarea input border-2 rounded-lg border-accent focus:border-secondary outline-none bg-background p-2" autocapitalize="off" autocomplete="off" placeholder={placeholder} id={id} no-resize cols={cols} rows={rows} ></textarea>

<style>
    [no-resize] {
        resize: none;
    }
</style>