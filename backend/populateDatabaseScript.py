inserts_data = open('data.sql', 'w')
    
users = [["1", "Antonio", "Costa", "antonio@gmail.com", "15/06/2000", "Male"], ["2", "Célia", "Maggy", "celia@gmail.com", "10/10/1900", "Female"], ["3", "João", "Silva", "joao@gmail.com", "14/04/1996", "Male"]]

ID = 1
for user in users:
    inserts_data.write("INSERT INTO USER (id, first_name, last_name, email, birth_date, sex) VALUES ")
    inserts_data.write("( '" + user[0] + "', '" + user[1] + "', '" + user[2] + "', '" + user[3] + "', '" + user[4] + ", '"+ user[4] +"' );\n")
    ID += 1
    
homes = [["1", "Casa", "Rua de Cima, 450", "São João da Madeira", "Aveiro", "902-8888"],
         ["2", "Casa", "NULL", "NULL", "NULL", "NULL"] , ["2", "Hotel", "NULL", "NULL", "NULL", "NULL"],
         ["3", "Casa", "NULL", "NULL", "NULL", "NULL"], ["3", "Trabalho", "NULL", "NULL", "NULL", "NULL"]]

inserts_data.write("\n\n")

ID = 1
for home in homes:
    inserts_data.write("INSERT INTO HOME (id, admin_id, name, address, city, state, zip) VALUES ")
    inserts_data.write("( '" + str(ID) + "', '" + home[0] + "', '" + home[1] + "', '" + home[2] +", '"+ home[3] + "', '" + home[4] + "', '" + home[5] + "' );\n")
    ID += 1
        
divisions = ["Living Room", "Bathroom", "Main Entrance", "Kitchen", "Bedroom"]