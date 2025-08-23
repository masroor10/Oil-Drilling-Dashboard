'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Box, Paper, Typography, TextField, IconButton, Button, Avatar } from '@mui/material';
import { ChatMessage, WellData } from '../../../types';
import { Attachment01Icon, BotIcon, Navigation03Icon } from 'hugeicons-react';

interface ChatbotInterfaceProps {
  uploadedData: WellData[] | null;
}

const ChatbotInterface: React.FC<ChatbotInterfaceProps> = ({ uploadedData }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi, I'm Drill AI. Ask me anything about this well!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage, wellData: uploadedData })
      });
      const data = await response.json();

      if (data.success) {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: data.answer,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        borderLeft: 1,
        borderColor: 'divider'
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <BotIcon style={{ color: '#2196f3', marginRight: 1 }} />
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            Drill AI
          </Typography>
          <Button
            variant='text'
            size='small'
            sx={{ ml: 'auto', textTransform: 'none', color: 'text.secondary' }}
          >
            Clear History
          </Button>
        </Box>

        <Button
          variant='contained'
          fullWidth
          sx={{
            bgcolor: '#2196f3',
            '&:hover': { bgcolor: '#1976d2' },
            textTransform: 'none',
            py: 1
          }}
        >
          Click to start voice chat!
        </Button>
      </Box>

      {/* Messages */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              mb: 2,
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            {message.sender === 'bot' && (
              <Avatar sx={{ bgcolor: '#2196f3', mr: 1, width: 32, height: 32 }}>
                <BotIcon fontSize='small' />
              </Avatar>
            )}
            <Box
              sx={{
                maxWidth: '80%',
                p: 1.5,
                borderRadius: 2,
                bgcolor: message.sender === 'user' ? '#2196f3' : '#e3f2fd',
                color: message.sender === 'user' ? 'white' : 'text.primary'
              }}
            >
              <Typography variant='body2'>{message.text}</Typography>
            </Box>
          </Box>
        ))}
        {isLoading && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: '#2196f3', mr: 1, width: 32, height: 32 }}>
              <BotIcon fontSize='small' />
            </Avatar>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: '#e3f2fd'
              }}
            >
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                Typing...
              </Typography>
            </Box>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box sx={{ p: 2, border: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size='small' sx={{ color: '#2196f3' }}>
            <Attachment01Icon />
          </IconButton>
          <TextField
            fullWidth
            placeholder='Type messages here'
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            variant='outlined'
            size='small'
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1
              }
            }}
          />
          <IconButton
            size='small'
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            sx={{ color: '#2196f3' }}
          >
            <Navigation03Icon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default ChatbotInterface;
