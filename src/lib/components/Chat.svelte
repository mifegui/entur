<script>
	import Message from './Message.svelte';

	let messages = $state([]);
	let inputText = $state('');
	let isLoading = $state(false);
	let chatContainer;

	async function sendMessage() {
		if (!inputText.trim() || isLoading) return;

		const userMessage = {
			role: 'user',
			content: inputText.trim()
		};

		messages = [...messages, userMessage];
		inputText = '';
		isLoading = true;

		// Scroll to bottom
		setTimeout(() => {
			if (chatContainer) {
				chatContainer.scrollTop = chatContainer.scrollHeight;
			}
		}, 0);

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					messages: [...messages]
				})
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Failed to get response');
			}

			messages = [...messages, data];

			// Scroll to bottom after response
			setTimeout(() => {
				if (chatContainer) {
					chatContainer.scrollTop = chatContainer.scrollHeight;
				}
			}, 0);
		} catch (error) {
			console.error('Error:', error);
			messages = [
				...messages,
				{
					role: 'assistant',
					content: 'Sorry, I encountered an error. Please try again.'
				}
			];
		} finally {
			isLoading = false;
		}
	}

	function clearChat() {
		if (confirm('Clear the conversation?')) {
			messages = [];
		}
	}

	function handleKeyPress(event) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	}
</script>

<div class="chat-wrapper">
	<div class="chat-header">
		<h1>English Tutor</h1>
		<button class="clear-btn" onclick={clearChat} disabled={messages.length === 0}>
			Clear Chat
		</button>
	</div>

	<div class="chat-container" bind:this={chatContainer}>
		{#if messages.length === 0}
			<div class="welcome-message">
				<h2>Welcome to English Tutor!</h2>
				<p>Start practicing your English by typing a message below.</p>
				<p>I'll help correct your mistakes and keep the conversation going.</p>
			</div>
		{:else}
			{#each messages as message (message)}
				<Message role={message.role} content={message.content} />
			{/each}
		{/if}

		{#if isLoading}
			<div class="loading">
				<div class="loading-dots">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		{/if}
	</div>

	<div class="input-container">
		<textarea
			bind:value={inputText}
			onkeypress={handleKeyPress}
			placeholder="Type your message in English..."
			disabled={isLoading}
			rows="1"
		></textarea>
		<button onclick={sendMessage} disabled={!inputText.trim() || isLoading}>
			Send
		</button>
	</div>
</div>

<style>
	.chat-wrapper {
		display: flex;
		flex-direction: column;
		height: 100vh;
		height: 100dvh;
		max-width: 800px;
		margin: 0 auto;
		background: white;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
		position: relative;
	}

	.chat-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.5rem;
		background: #007bff;
		color: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.chat-header h1 {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
	}

	.clear-btn {
		background: rgba(255, 255, 255, 0.2);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.3);
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: background 0.2s;
		font-size: 0.9rem;
	}

	.clear-btn:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.3);
	}

	.clear-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.chat-container {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		padding: 1.5rem;
		background: #f8f9fa;
		min-height: 0;
		-webkit-overflow-scrolling: touch;
	}

	.welcome-message {
		text-align: center;
		padding: 3rem 1rem;
		color: #6c757d;
	}

	.welcome-message h2 {
		color: #007bff;
		margin-bottom: 1rem;
		font-weight: 600;
	}

	.welcome-message p {
		margin: 0.5rem 0;
		line-height: 1.6;
	}

	.loading {
		display: flex;
		justify-content: flex-start;
		margin-bottom: 1rem;
	}

	.loading-dots {
		background: #f1f3f5;
		padding: 0.75rem 1rem;
		border-radius: 1rem;
		border-bottom-left-radius: 0.25rem;
		display: flex;
		gap: 0.25rem;
	}

	.loading-dots span {
		width: 8px;
		height: 8px;
		background: #6c757d;
		border-radius: 50%;
		animation: bounce 1.4s infinite ease-in-out both;
	}

	.loading-dots span:nth-child(1) {
		animation-delay: -0.32s;
	}

	.loading-dots span:nth-child(2) {
		animation-delay: -0.16s;
	}

	@keyframes bounce {
		0%,
		80%,
		100% {
			transform: scale(0);
		}
		40% {
			transform: scale(1);
		}
	}

	.input-container {
		display: flex;
		gap: 0.75rem;
		padding: 1rem 1.5rem;
		background: white;
		border-top: 1px solid #dee2e6;
		flex-shrink: 0;
	}

	textarea {
		flex: 1;
		padding: 0.75rem;
		border: 1px solid #ced4da;
		border-radius: 0.5rem;
		font-size: 1rem;
		font-family: inherit;
		resize: none;
		min-height: 44px;
		max-height: 120px;
	}

	textarea:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
	}

	textarea:disabled {
		background: #f8f9fa;
		cursor: not-allowed;
	}

	button {
		padding: 0.75rem 1.5rem;
		background: #007bff;
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.2s;
		white-space: nowrap;
	}

	button:hover:not(:disabled) {
		background: #0056b3;
	}

	button:disabled {
		background: #6c757d;
		cursor: not-allowed;
		opacity: 0.6;
	}

	@media (max-width: 768px) {
		.chat-wrapper {
			box-shadow: none;
		}

		.chat-header {
			flex-shrink: 0;
		}

		.chat-header h1 {
			font-size: 1.25rem;
		}

		.input-container {
			padding: 0.75rem;
			position: sticky;
			bottom: 0;
		}

		textarea {
			font-size: 16px;
		}

		button {
			padding: 0.75rem 1rem;
		}
	}
</style>
