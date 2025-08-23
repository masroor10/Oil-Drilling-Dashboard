import React from 'react';

export const sidebarContainer: React.CSSProperties = {
  minHeight: '950px',
  height: '98vh',
  padding: '0px 16px 40px 16px',
  width: '100%',
  position: 'fixed',
  left: '16px',
  top: '16px',
  maxWidth: 280,
  zIndex: 500,
  boxShadow: `0px 16px 32px -4px rgba(145, 158, 171, 0.16)`
};
export const headerContainer: React.CSSProperties = {
  width: '100%',
  position: 'fixed',
  top: 0,

  display: 'flex',
  padding: '10px 40px',
  right: 0,
  borderRadius: '55px',
  zIndex: 400,
  background: 'white'
};
export const SHeading: React.CSSProperties = {
  fontWeight: 700,
  fontSize: '11px',
  color: '#919EAB',
  textTransform: 'uppercase',
  marginLeft: '16px',
  padding: '10px 0px'
};
export const sidebarFooter: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  bottom: 40,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center'
};
export const bottomNave: React.CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  zIndex: 400,
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
  padding: '4px 16px',
  boxShadow: '0 -4px 8px 0 #919eab29',
  background: 'white',
  borderTopLeftRadius: '24px',
  borderTopRightRadius: '24px'
};
