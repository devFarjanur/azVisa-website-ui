tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#1a56db',
                'primary-dark': '#1e429f',
                secondary: '#f59e0b',
                light: '#f8fafc',
                dark: '#1e293b',
                gray: '#64748b',
                success: '#10b981',
                danger: '#ef4444',
            },
            boxShadow: {
                custom: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'custom-hover':
                    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                glow: '0 0 20px rgba(37, 99, 235, 0.3)',
            },
            animation: {
                'pulse-slow': 'pulse 2s infinite',
                'bounce-slow': 'bounce 2s infinite',
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-out',
                float: 'float 6s ease-in-out infinite',
                shimmer: 'shimmer 2s infinite',
            },
        },
    },
};
