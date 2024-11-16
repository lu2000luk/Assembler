<script>
    let { args, children } = $props();

    let { gap } = args;
</script>

<div class="component flex items-center justify-center w-100" style="gap: {gap}px;">
    {@render children()}
</div>