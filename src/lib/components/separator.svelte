<script>
    let { args, id } = $props();

    let { distance } = args;
</script>

<div class="component separator w-full" id={id} style="height: {distance};"></div>