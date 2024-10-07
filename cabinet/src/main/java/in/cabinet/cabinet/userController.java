package in.cabinet.cabinet;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

@Repository
@RestController
@RequestMapping("/api")
public class userController {

    @Autowired
    private userService userService;

    @GetMapping("/user")
    public List<User> get() {
        System.out.println("Fetching all users");
        List<User> users = userService.get();
        System.out.println("Users fetched: " + users);
        return users;
    }

    @PostMapping("/user")
    public User save(@RequestBody User userObj) {
        userService.save(userObj);
        return userObj;
    }

    @GetMapping("/user/{id}")
    public User get(@PathVariable int id) {
        User userOBJ = userService.get(id);
        if (userOBJ == null) {
            throw new RuntimeException("Patient with id" + id + " is not found");

        }
        return userOBJ;
    }

    @DeleteMapping("/user/{id}")
    public String delete(@PathVariable int id) {
        userService.delete(id);
        return "Patient has been deleted successfully";
    }

    @PutMapping("/user")
    public User update(@RequestBody User userOBJ) {
        userService.save(userOBJ);
        return userOBJ;
    }


}