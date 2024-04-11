import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ){}

    @Get()
    getAllUsers(){
        console.log(this.usersService);
        return this.usersService.findAll();
    }

    @Get(':id')
    getUserById( @Param( 'id', ParseUUIDPipe ) id: string ){
        return this.usersService.findById( id );
    }

    @Post()
    CreateUser( @Body() createUserDto: CreateUserDto  ){

        return this.usersService.create( createUserDto )

    }

    @Patch(':id')
    updateUser(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateUserDto: UpdateUserDto )
        {
            return this.usersService.update( id, updateUserDto )
        }

    @Delete(':id')
    deleteUser(@Param('id', ParseUUIDPipe) id: string ){
        return this.usersService.delete( id )
    }


}
