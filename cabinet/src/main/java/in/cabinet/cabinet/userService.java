package in.cabinet.cabinet;

import java.util.List;

public interface userService {
    List<User> get();

    User get(int id);

    void save(User User);

    void delete(int id);



}
