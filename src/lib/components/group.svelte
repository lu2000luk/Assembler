<script>
    let { args, children, id } = $props();

    let { gap } = args;
</script>

<div class="component flex items-center justify-center w-100" id={id} style="gap: {gap}px;">
    {@render children()}
</div>