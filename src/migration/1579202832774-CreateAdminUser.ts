import {MigrationInterface, QueryRunner} from "typeorm";
import {User} from "../entity/User";

export class CreateAdminUser1579202832774 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const users = [
            {id: "000000000", name: "SysAdmin", lastName: "TEST", password: "123456", email: "sysadmin@app.com", phone: "+573209661604", role: "ADMINISTRADOR"},
            {id: "111111111", name: "Profesor", lastName: "TEST", password: "123456", email: "profesor@app.com", phone: "+573209661604", role: "PROFESOR"},
            {id: "222222222", name: "Estudiante", lastName: "TEST", password: "123456", email: "estudiante@app.com", phone: "+573209661604", role: "ESTUDIANTE"},
        ]
      try {

            for (let i = 0; i < users.length; i++) {
                let user = new User();
                user.id = users[i].id;
                user.name = users[i].name;
                user.password = users[i].password;
                user.email = users[i].email;
                user.phone = users[i].phone;
                user.role = users[i].role;
                user.lastName = users[i].lastName;
                user.hashPassword();
                await user.save();
            }

      } catch (e) {
          console.log(e);
      }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }
}
