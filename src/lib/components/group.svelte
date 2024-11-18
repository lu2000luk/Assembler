<script>
    let { args, children, id } = $props();

    let { gap } = args;
</script>

<div class="component group flex items-center justify-center" id={id} style="gap: {gap}px;">
    {@render children()}
</div>