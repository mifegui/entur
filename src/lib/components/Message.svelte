<script>
	export let role = 'user';
	export let content = '';
</script>

<div class="message {role}">
	<div class="message-bubble">
		{content}
	</div>
</div>

<style>
	.message {
		display: flex;
		margin-bottom: 1rem;
		animation: slideIn 0.3s ease-out;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.message.user {
		justify-content: flex-end;
	}

	.message.assistant {
		justify-content: flex-start;
	}

	.message-bubble {
		max-width: 70%;
		padding: 0.75rem 1rem;
		border-radius: 1rem;
		white-space: pre-wrap;
		word-wrap: break-word;
		line-height: 1.5;
	}

	.user .message-bubble {
		background: #007bff;
		color: white;
		border-bottom-right-radius: 0.25rem;
	}

	.assistant .message-bubble {
		background: #f1f3f5;
		color: #212529;
		border-bottom-left-radius: 0.25rem;
	}

	@media (max-width: 768px) {
		.message-bubble {
			max-width: 85%;
		}
	}
</style>
