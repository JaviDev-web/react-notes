import { v2 as cloudinary } from 'cloudinary'
import { fileUpload }  from '../../src/helpers/fileUpload'

cloudinary.config({
    cloud_name:'dydoc7ffi',
    api_key:'925581291948387',
    api_secret:'Ig2OL1lkBX-V-dIrwobXUSosspw',
    secure:true,
})

describe('Pruebas en fileUpload', () => { 
    
    test('debe de subir el archivo correctamente a cloudinary', async () =>{

        const imageUrl = 'https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=480&h=320'
        const resp = await fetch( imageUrl )
        const blob = await resp.blob()
        const file = new File( [blob], 'foto.jpg')

        const url = await fileUpload( file )


        console.log(url);
        expect( typeof url).toBe( 'string' )
        const segments = url.split('/')
        // console.log(segments);
        const imageId = segments[ segments.length -1 ].replace('.jpg','')
        const cloudRespond = await cloudinary.api.delete_resources([ 'journal-app/' + imageId ],{
            resource_type: 'image'
        })
        // console.log(cloudRespond);
        

    })

    test('debe de retornar null', async () => { 

        const file = new File( [], 'foto.jpg' )

        const url = await fileUpload( file )

        expect( url ).toBe( null )


     })

 })