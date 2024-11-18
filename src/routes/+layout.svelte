<script lang="ts">
	import '../app.css';
	let { children } = $props();

	import { FirebaseApp } from 'sveltefire';
	import { auth, firestore } from "$lib/firebase";
	import { browser } from '$app/environment';
	import { SignedIn, SignedOut } from 'sveltefire';

	import Homepage from '$lib/Homepage.svelte';

	let path = $state("");

	if (browser) {
		path = location.pathname;
	}
</script>

<svelte:head>
    <title>Assembler</title>
    <meta name="description" content="Assembler is a web-based tool for creating interactive web pages and demos with ease.">
    <meta name="keywords" content="web, web development, web design, web tools, web apps, web pages, web demos, web projects, web creation, web assembly, web assembly tools, web assembly projects, web assembly demos, web assembly pages, web assembly creation, web assembly apps, web assembly design, web assembly development, web assembly tools, web assembly projects, web assembly demos, web assembly pages, web assembly creation, web assembly apps, web assembly design, web assembly development">
    <meta name="author" content="lu2000luk">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<FirebaseApp {auth} {firestore}>
	<SignedIn let:signOut>
		<div class="navbar flex justify-between m-4 items-center select-none">
			<div class="name">
				<a class="text-2xl cursor-pointer font-bold inline-block bg-clip-text bg-gradient-to-r from-primary to-accent transition-all" style="color: transparent;" href="../../">
					Assembler
				</a>
			</div>
			<button onclick={signOut} class="px-5 py-2 border-2 rounded-lg border-accent transition-all duration-200 hover:bg-accent cursor-pointer">Sign out</button>
		</div>
		{@render children()}
	</SignedIn>
	<SignedOut>
			{#if path === '/'}
				<Homepage />
			{:else}
				{@render children()}
			{/if}
	</SignedOut>
</FirebaseApp>