import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

    private users: User[] = [
        {
            id: uuid(),
            name: 'Angel Daniel Doria Moncada',
            email: 'Danieldoriamoncada28@gmail.com',
            password: 'messi',
            age: 20
        },
        {
            id: uuid(),
            name: 'Luis Aguiñaga',
            email: 'cochiloko@gmail.com',
            password: 'cristiano',
            age: 22
        }
    ];

    findAll(){
        return this.users;
    }

    findById( id:string ){
        const user = this.users.find( user => user.id === id )
        if( !user ) throw new NotFoundException(' User not found ',id)
            
        return user
    }

    create( createUserDto: CreateUserDto ){
        const {email} = createUserDto;
        
        const existingUser = this.users.find( user => user.email === email )

        if ( existingUser ) throw new BadRequestException('Email ya existe')

        const newUser: User = {
            id: uuid(),
            ...createUserDto
        } 
        
        this.users.push( newUser )
        return newUser;

    }

    update( id:string, updateUserDto: UpdateUserDto ){

        let userDB = this.findById( id );

        if ( updateUserDto.id && updateUserDto.id !== id ) throw new BadRequestException('Id no coincide')

        this.users = this.users.map( user => {

            if( user.id === id){
                userDB = {...userDB, ...updateUserDto, id  }

                return userDB
            }

            return user;
        })

        return userDB;
    }

    delete( id:string ){
        this.findById( id )
        this.users = this.users.filter( user => user.id !== id )

    }



}
