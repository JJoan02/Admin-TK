let handler = async (m, { conn, isRowner }) => {
    const newName = m.text.trim().split(' ').slice(1).join(' ');
  
   
    if (!newName) {
      return m.reply('Por favor, proporciona un nuevo nombre para el bot.');
    }
  
   
    global.botname = newName;  
  
    
    m.reply(`ยกEl nombre del bot ha sido actualizado a: ${newName}!`);
  
  
  };
  
 
  handler.help = ['setname'];  
  handler.tags = ['banner'];
  handler.command = ['setname']; 
  handler.rowner = true

  export default handler;