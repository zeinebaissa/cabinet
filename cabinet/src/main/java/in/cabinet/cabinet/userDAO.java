package in.cabinet.cabinet;

import java.util.List;

public interface userDAO {

    List<User> get();

    User get(int id);

    void save(User User);

    void delete(int id);




}
