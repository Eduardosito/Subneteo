function validar(){
    var ip = document.getElementById('1b').value+"."+document.getElementById('2b').value+"."+document.getElementById('3b').value+"."+document.getElementById('4b').value;
    var patronIp = new RegExp("^([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3})$");    
    var numerp = new RegExp("^\[0-9]");
    var subrrrrr = document.getElementById('subr').value+"";
    if(patronIp.test(ip) && parseInt(document.getElementById('1b').value)<=255 && parseInt(document.getElementById('1b').value)>=0 &&
            parseInt(document.getElementById('2b').value)<=255 && parseInt(document.getElementById('2b').value)>=0 &&
            parseInt(document.getElementById('3b').value)<=255 && parseInt(document.getElementById('3b').value)>=0 &&
            parseInt(document.getElementById('4b').value)<=255 && parseInt(document.getElementById('4b').value)>=0 && numerp.test(subrrrrr)){    
        
        var aiuda = parseInt(document.getElementById('1b').value);
        
        if(aiuda === 127){
            alert("No puedes ocupar esta sireccion ip");
        }else{
            if(aiuda >= 224 && aiuda <= 255){
                alert("No puedes ocupar esta sireccion ip");
            }else{
                subneteo2(ip,aiuda);
            }
        }
        
        
    }else{
        alert("La direccion Ip que ingresaste no es valida");
    }
}

function subneteo2(ip, aiuda){
    var tipo;
    var mascara;
    var subr=parseInt(document.getElementById('subr').value);
    var mascaraBin;
    
    
    var n = 0;
    while(Math.pow(2, n) < subr){
        n++;
    }
    
    if(aiuda >= 0 && aiuda <= 127){
        tipo="A";
        mascara="255.0.0.0";
        mascaraBin="11111111.00000000.00000000.00000000";
    }else if(aiuda >= 128 && aiuda <= 191){
        tipo="B";
        mascara="255.255.0.0";
        mascaraBin="11111111.11111111.00000000.00000000";
    }else if(aiuda >= 192 && aiuda <= 223){
        tipo="C";
        mascara="255.255.255.0";
        mascaraBin="11111111.11111111.11111111.00000000";
    }else{
        alert("algo salio mal");   
    }
    
    var f=0;
    var mascaraBin2=mascaraBin;
    while(f < n){
        mascaraBin2=mascaraBin2.replace("0","1");
        f++;
    }
    var mascaraBin2B=mascaraBin2+".";
    
    var ayudaX1 = mascaraBin2B.slice(0,8);
    var ayudaX2 = mascaraBin2B.slice(9,17);
    var ayudaX3 = mascaraBin2B.slice(18,26);
    var ayudaX4 = mascaraBin2B.slice(27,35);
    
    var arreglo_Posibles_Claves=[ parseInt(ayudaX1, 2) , parseInt(ayudaX2, 2) , parseInt(ayudaX3, 2) , parseInt(ayudaX4, 2) ];  
    var clave;
    for (var i = 0; i < arreglo_Posibles_Claves.length; i++) {
        if(arreglo_Posibles_Claves[i] !== 255){
            
            clave = 256 - arreglo_Posibles_Claves[i];   
            break;
        }
        
    }
    var cantHost=0;
    for (var i = 0; i < mascaraBin2.length; i++) {
        if(mascaraBin2.charAt(i) === '0'){
            cantHost++;
        }
    }
    var cantH = parseInt(Math.pow(2, cantHost)) - 2;
    
    
    
    
    //Mis variables importantes son: clave que es el salto, mascaraBin2 es la nueva mascara de subred, mascaraBin es la mascara de red, cantH es la cantidad de hosts
    var numeroAyuda1 = parseInt(document.getElementById('1b').value);
    var numeroAyuda2 = parseInt(document.getElementById('2b').value);
    var numeroAyuda3 = parseInt(document.getElementById('3b').value);
    var numeroAyuda4 = parseInt(document.getElementById('4b').value);
    
    var ListaSubredes=[];
    
    var resto=0;
    switch (tipo){
        case 'A':
            
            while(subr > 0){
                numeroAyuda2=numeroAyuda2+clave;
                if(numeroAyuda2 > 255){
                    resto=resto + (numeroAyuda2-255);
                    numeroAyuda2=255;
                    
                    numeroAyuda3=numeroAyuda3+resto;
                    
                    
                    if(numeroAyuda3 > 255){
                        resto=resto + (numeroAyuda3-255);
                        numeroAyuda3=255;
                    
                        numeroAyuda4=numeroAyuda4+resto;
                        
                        if(numeroAyuda4 > 255){
                            numeroAyuda4=255;
                            ListaSubredes.push(numeroAyuda1+"."+numeroAyuda2+"."+numeroAyuda3+"."+numeroAyuda4);
                            subr--;
                        }else{
                            ListaSubredes.push(numeroAyuda1+"."+numeroAyuda2+"."+numeroAyuda3+"."+numeroAyuda4);
                            subr--;
                        }
                        
                        
                    
                    }else{
                        ListaSubredes.push(numeroAyuda1+"."+numeroAyuda2+"."+numeroAyuda3+"."+numeroAyuda4);
                        subr--;
                    }
                    
                    
                    
                }else{
                    ListaSubredes.push(numeroAyuda1+"."+numeroAyuda2+"."+numeroAyuda3+"."+numeroAyuda4);
                    subr--;
                }
                
                
            }
            
            break;
        case 'B':
            while(subr > 0){
                numeroAyuda3=numeroAyuda3+clave;
                if(numeroAyuda3 > 255){
                    resto=resto + (numeroAyuda3-255);
                    numeroAyuda3=255;
                    
                    numeroAyuda4=numeroAyuda4+resto;
                        
                    if(numeroAyuda4 > 255){
                        numeroAyuda4=255;
                        ListaSubredes.push(numeroAyuda1+"."+numeroAyuda2+"."+numeroAyuda3+"."+numeroAyuda4);
                        subr--;
                    }else{
                        ListaSubredes.push(numeroAyuda1+"."+numeroAyuda2+"."+numeroAyuda3+"."+numeroAyuda4);
                        subr--;
                    }
                        
                        
                    
                }else{
                    ListaSubredes.push(numeroAyuda1+"."+numeroAyuda2+"."+numeroAyuda3+"."+numeroAyuda4);
                    subr--;
                }
            }
            
            
            break;
        case 'C':
            while(subr > 0){
                numeroAyuda4=numeroAyuda4+clave;
                if(numeroAyuda4 > 255){
                    numeroAyuda4=255;
                    ListaSubredes.push(numeroAyuda1+"."+numeroAyuda2+"."+numeroAyuda3+"."+numeroAyuda4);
                    subr--;
                }else{
                    ListaSubredes.push(numeroAyuda1+"."+numeroAyuda2+"."+numeroAyuda3+"."+numeroAyuda4);
                    subr--;
                }
            }
            
            
            break;
        default:
            alert("Lo sentimos, algo salio mal");
    }
    let registro="";
    for (var z = 0; z < ListaSubredes.length-1; z+=2) {
        registro=registro+("<tr><td>"+ "Subred No " +(z)+": "+ListaSubredes[z]+"</td><td>"+ "Subred No " +(z+1)+": "+ListaSubredes[z+1]+"</td></tr>");
    }
    document.getElementById('datosss').innerHTML="Tipo: "+tipo+" Mascara: "+mascara+" Submascara de subred: "+mascaraBin2+" cantidad de host posibles: "+ cantH+" salto: "+clave;
    document.getElementById('resultado').innerHTML= registro+" ";
}

