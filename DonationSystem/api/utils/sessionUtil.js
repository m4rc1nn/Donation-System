const chars = 'abcdefghijklmnopqrstuvwyz123456789'.split('');

module.exports.create = () => {
    let sessionId = '';
    for(let x=0; x<8; x++){
        sessionId += chars[parseInt(Math.random()*(chars.length - 1))];
    }
    sessionId += '-';
    for(x=0; x<4; x++){
        sessionId += chars[parseInt(Math.random()*(chars.length - 1))];
    }
    sessionId += '-';
    for(x=0; x<4; x++){
        sessionId += chars[parseInt(Math.random()*(chars.length - 1))];
    }
    sessionId += '-';
    for(x=0; x<4; x++){
        sessionId += chars[parseInt(Math.random()*(chars.length - 1))];
    }
    sessionId += '-';
    for(x=0; x<12; x++){
        sessionId += chars[parseInt(Math.random()*(chars.length - 1))];
    }
    return sessionId;
}